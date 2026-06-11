import dotenv from 'dotenv';
import sendEmail from './utils/sendEmail.js';

// Load environment variables
dotenv.config();

console.log('🧪 Testing Email Configuration...\n');

// Check if environment variables are set
console.log('📋 Environment Variables Check:');
console.log('BREVO_API_KEY:', process.env.BREVO_API_KEY ? '✅ Set' : '❌ Not Set');
console.log('OTP_EXPIRE_MINUTES:', process.env.OTP_EXPIRE_MINUTES || '5 (default)');
console.log('');

if (!process.env.BREVO_API_KEY) {
  console.error('❌ ERROR: BREVO_API_KEY must be set in .env file');
  console.error('');
  console.error('Please configure BREVO_API_KEY in your .env file.');
  process.exit(1);
}

// Test email sending
const testOTP = Math.floor(100000 + Math.random() * 900000).toString();

console.log('📧 Sending test email...');
console.log('Test OTP:', testOTP);
console.log('');

sendEmail({
  email: process.env.TEST_EMAIL || 'roshanshaikh21122006@gmail.com', // Recipient email for testing
  subject: 'Test Email - Chat App OTP System',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
        .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
        .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Email Configuration Test</h1>
        </div>
        <div class="content">
          <div class="success">
            <strong>🎉 Success!</strong> Your email configuration is working correctly!
          </div>
          <h2>Test OTP Code</h2>
          <p>This is a test email to verify your OTP email system is configured properly.</p>
          <div class="otp-box">
            <div class="otp-code">${testOTP}</div>
          </div>
          <p><strong>What this means:</strong></p>
          <ul>
            <li>✅ Brevo REST API connection is working</li>
            <li>✅ Email sending is functional</li>
            <li>✅ Your chat app can now send OTP emails</li>
          </ul>
          <p><strong>Next Steps:</strong></p>
          <ol>
            <li>Start your backend server: <code>npm run dev</code></li>
            <li>Start your frontend: <code>cd ../frontend && npm run dev</code></li>
            <li>Test user registration with OTP verification</li>
            <li>Test forgot password flow</li>
          </ol>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Chat App - Email Test</p>
        </div>
      </div>
    </body>
    </html>
  `,
})
  .then((result) => {
    if (!result.success) {
      throw new Error(result.error || 'Unknown email sending error');
    }
    console.log('');
    console.log('✅ ========================================');
    console.log('✅ EMAIL TEST SUCCESSFUL!');
    console.log('✅ ========================================');
    console.log('');
    console.log('📬 Check your inbox:', process.env.TEST_EMAIL || 'roshanshaikh21122006@gmail.com');
    console.log('📬 Message ID:', result.messageId);
    console.log('');
    console.log('🎉 Your email configuration is working correctly!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Check your email inbox (and spam folder)');
    console.log('2. You should see a test email with OTP:', testOTP);
    console.log('3. Start your backend server: npm run dev');
    console.log('4. Test user registration with real OTP');
    console.log('');
    process.exit(0);
  })
  .catch((error) => {
    console.log('');
    console.log('❌ ========================================');
    console.log('❌ EMAIL TEST FAILED!');
    console.log('❌ ========================================');
    console.log('');
    console.error('Error:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('');
    
    if (error.message.includes('Unauthorized') || error.message.includes('api-key') || error.message.includes('key')) {
      console.log('❌ Authentication Error - Check these:');
      console.log('   1. BREVO_API_KEY is correct');
      console.log('   2. Your sender email is verified in Brevo');
    } else if (error.message.includes('ECONNECTION') || error.message.includes('timeout') || error.message.includes('fetch')) {
      console.log('❌ Connection Error - Check these:');
      console.log('   1. Internet connection is working');
      console.log('   2. Firewall is not blocking outgoing HTTP requests to api.brevo.com');
    } else {
      console.log('❌ Unknown Error:');
      console.log('   ', error.message);
      console.log('');
      console.log('📖 Check the full error above and OTP_SETUP_GUIDE.md');
    }
    
    console.log('');
    process.exit(1);
  });
