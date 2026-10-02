
- Decision 1:  
    Description: In an ideal world the UI and API tests would live in seperate repositories (ideally the source code repository. There's some maintenace overhead in maintaining two Playwright instances but I like the seperation of UI and API concerns.

- Decision 2: 
    Description: Decided against putting enviroment values in the .env file - they're not secrets. Although it perhaps would of been quicker and easier.

- Decision 3:
    Description: Could look into using fixtures in the future. Although I didn't see much value in having them for just initialising the page objects.