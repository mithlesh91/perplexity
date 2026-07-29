import "dotenv/config"
import nodeMailer from "nodemailer"

export const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLINENT_ID,
    clientSecret: process.env.GOOGLE_CLINENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRACE_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify()
  .then(() => {
    console.log("Email transporter is ready");
  })
  .catch((err) => {
    console.log(err);
  });
export async function sendMail({to,html,subject,text}) {
     const mailOptions = {
      from:process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text
     }
     const details = await transporter.sendMail(mailOptions)
     console.log("Email sent",details)
}