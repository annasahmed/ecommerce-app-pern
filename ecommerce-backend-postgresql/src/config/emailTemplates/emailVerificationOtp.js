const emailVerificationOtpTemplate = ({ customerName, otp, }) => {
	return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; background:#f6f6f6; padding:20px; margin:0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" style="background:#ffffff; padding:24px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <a href="https://yourwebsite.com" target="_blank">
                <img src="https://yourwebsite.com/logo.png" alt="B. Babies n Baba" width="150" style="display:block;" />
              </a>
            </td>
          </tr>

          <!-- Header -->
          <tr>
            <td>
              <h2 style="margin:0 0 10px; color:#5DABEA;">Email Verification</h2>
              <p style="margin:0 0 20px; color:#333;">
                Hi <strong>${customerName || ''}</strong>,<br/>
                Use the following OTP to verify your email address. This OTP is valid for <strong>30 minutes</strong>.
              </p>
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding:20px 0;">
              <div style="display:inline-block; padding:20px 40px; font-size:32px; letter-spacing:8px; color:#ffffff; background:#5DABEA; border-radius:8px; font-weight:bold;">
                ${otp}
              </div>
            </td>
          </tr>

          <!-- Footer Message -->
          <tr>
            <td style="padding-top:20px; color:#555; text-align:center;">
              <p style="margin:0;">
                If you did not request this verification, please ignore this email.<br/>
                For any questions, reply to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:30px; font-size:12px; color:#888;">
              &copy; ${new Date().getFullYear()} B. Babies n Baba. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

module.exports = { emailVerificationOtpTemplate };
