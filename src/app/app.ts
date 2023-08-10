import LoginPage from '../pages/login-page/login-page';
import RegistrationPage from '../pages/registration-page/registration-page';

class App {
  private loginPage: LoginPage;

  private registartionPage: RegistrationPage;

  constructor() {
    this.loginPage = new LoginPage();
    this.registartionPage = new RegistrationPage();
  }

  public start(): void {
    // this.loginPage.render();
    this.registartionPage.render();
  }
}

export default App;
