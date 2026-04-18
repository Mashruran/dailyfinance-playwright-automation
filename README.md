# Playwright Project – Daily Finance

## Features Covered

- Register new user
- Assert congratulation message
- Save user information in JSON
- Login with new user
- Verify `/user` in URL
- Add two items
- Save table data in TXT file
- Logout
- Reset password
- Login with new password
- Upload profile image below 100KB
- Verify uploaded image using `profileImage` text in image src
- CI/CD using GitHub Actions
- Weekly cron execution every Friday at 11:59 PM

## Report Screenshot

<img width="1003" height="843" alt="Screenshot 2026-04-18 211022" src="https://github.com/user-attachments/assets/e1dcfa80-db07-4281-9d3a-12f861354c9b" />


## Automation Video
![Watch Video](https://drive.google.com/file/d/1OcPFiNkP5KrCDgZRcwMZ-3fzqOwiMqzl/view?usp=drive_link)

```bash
npm install
npx playwright test --config=playwright_debug.config.ts
