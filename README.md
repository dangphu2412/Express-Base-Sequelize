# Start your project
- First you need to <code>npm install</code> or <code>yarn install</code>
- Check .env.example then create new file .env then fill it up.
- If connection to pg is available go to next step.
- Run  <code>yarn migrate:latest</code> to migrate the latest files and run <code>yarn seed:run</code> if you want to have seeds to test.
- Finally, run <code>yarn dev</code> or <code>npm run dev</code>
- Please make sure your have the right version of nodejs and postgresql
# Convention:
## Design pattern:
### Singleton module:
- Each module may contain: controller, service and repository. These are default singleton if we export it as a alias via new instance. Example: export const AuthController = new Controller();
### Repository pattern:
- Each repository (if exist) will be injected by a model from Sequelize model via constructor
- Allow to redefine some needed function related to query
### Liskov Substitution Principle
- Define class parent and children extends from that not change the right ability of parent class
### Open/closed principle
- Write code for easy opening and hard to rewrite, easy to reuse. We should write new class to open new function not rewrite old class.
## Code convention
- Single colon
- Use <b>export const</b> instead of <b>export default</b> for easy knowing alias import
- Core directory must have index.js to export all sub module dir.
- Scope should be define in <code>common/constants/scopes</code> first then use name in model define scopes.
## Structure
- Each api must have validation
- Inject other module via service not repository.
## Reference
<a href="https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/">SOLID</a>