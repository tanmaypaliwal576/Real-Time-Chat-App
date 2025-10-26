export default function createWelcomeEmailTemplate(name, clientURL, email) {
  // NOTE: Assuming 'name' is the user's Full Name (e.g., Jane Doe)
  // and 'clientURL' is the user's Email Address (e.g., jane@example.com),
  // as per the requirement to pass these two pieces of data.
  const userEmail = email;
  const appURL = "https://huddle-tgykr.sevalla.app/"; // Placeholder for a real dashboard link

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Alert</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 550px; margin: 0 auto; padding: 20px; background-color: #f0f3f5;">
    
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      
      <div style="background-color: #FF5733; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;"> New User Joined </h1>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px;">
        
        <p style="font-size: 16px; margin-bottom: 30px;">
          The Huddle has a new user! Here are the details:
        </p>
        
        <div style="margin-bottom: 25px;">
          
          <div style="background-color: #e8f5e9; border-left: 4px solid #4CAF50; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
            <p style="font-size: 12px; color: #4CAF50; margin: 0 0 5px 0; font-weight: 700;">USER NAME</p>
            <p style="font-size: 18px; color: #333; margin: 0;"><strong>${name}</strong></p>
          </div>
          
          <div style="background-color: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; border-radius: 4px;">
            <p style="font-size: 12px; color: #2196F3; margin: 0 0 5px 0; font-weight: 700;">EMAIL ADDRESS</p>
            <p style="font-size: 18px; color: #333; margin: 0;">
              <a href="mailto:${userEmail}" style="color: #2196F3; text-decoration: none;">${userEmail}</a>
            </p>
          </div>

        </div>
        
        <p style="margin-top: 25px; font-size: 14px; color: #555;">
          You are receiving this notification to track growth. Please do not reply to this system message.
        </p>

        <div style="text-align: center; margin: 30px 0 10px;">
          <a href="${appURL}" style="background-color: #008CBA; color: white; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: 600; display: inline-block;">Go to Admin Dashboard</a>
        </div>
        
      </div>
    </div>
    
    <div style="text-align: center; padding: 15px 0; color: #999; font-size: 11px;">
      <p>© 2025 Messenger System. All rights reserved.</p>
    </div>

  </body>
  </html>
  `;
}
