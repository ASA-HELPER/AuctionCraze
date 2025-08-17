import { User } from "../models/userSchema.js";
import { PaymentProof } from "../models/paymentProofSchema.js";
import { Commission } from "../models/commissionSchema.js";
import cron from "node-cron";
import { sendEmail } from "../utils/sendEmail.js";

export const verifyCommissionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Verify Commission Cron...");

    // Fetch only approved proofs in small batches
    const approvedProofs = await PaymentProof.find({
      status: "Approved",
    }).limit(50);

    for (const proof of approvedProofs) {
      try {
        const user = await User.findById(proof.userId);
        if (!user) continue;

        // Safe commission amount (handle overpayments)
        const commissionAmount = Math.min(proof.amount, user.unpaidCommission);

        // Update unpaidCommission
        const updatedUserData = await User.findByIdAndUpdate(
          user._id,
          {
            $inc: {
              unpaidCommission: -commissionAmount,
            },
          },
          { new: true }
        );

        // Mark proof as settled
        await PaymentProof.findByIdAndUpdate(proof._id, {
          status: "Settled",
        });

        // Record commission settlement
        await Commission.create({
          amount: commissionAmount,
          user: user._id,
        });

        // Prepare settlement email
        const settlementDate = new Date(Date.now()).toDateString();
        const subject = `Your Payment Has Been Successfully Verified And Settled`;
        const message = `Dear ${user.userName},\n\nWe are pleased to inform you that your recent payment has been successfully verified and settled. Thank you for promptly providing the necessary proof of payment. Your account has been updated, and you can now proceed with your activities on our platform without any restrictions.\n\nPayment Details:\nAmount Settled: ${commissionAmount}\nRemaining Unpaid Commission: ${updatedUserData.unpaidCommission}\nDate of Settlement: ${settlementDate}\n\nBest regards,\nZeeshu Auction Team`;

        // Send email safely
        await sendEmail({ email: user.email, subject, message });

        console.log(
          `User ${proof.userId} paid commission of ${commissionAmount}`
        );
      } catch (error) {
        console.error(
          `Error processing commission proof for user ${proof.userId}: ${error.message}`
        );
      }
    }
  });
};
