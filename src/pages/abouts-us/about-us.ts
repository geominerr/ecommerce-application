import TemplateView from '../template-view/template-view';
import './about-us.scss';
import { TagNames, Styles, Attributes } from './enum';

export default class AboutUs extends TemplateView {
  private container: HTMLDivElement;

  private header: HTMLHeadingElement;

  private projectDescription: HTMLDivElement;

  private descriptionLeft: HTMLDivElement;

  private descriptionRight: HTMLDivElement;

  private descriptionBottom: HTMLDivElement;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.header = this.createElement(TagNames.H1, Styles.HEADER);
    this.projectDescription = this.createElement(TagNames.DIV, Styles.PROJ_DESCRIPTION);
    this.descriptionLeft = this.createElement(TagNames.DIV, Styles.DESCRIPTION_LEFT);
    this.descriptionRight = this.createElement(TagNames.DIV, Styles.DESCRIPTION_RIGHT);
    this.descriptionBottom = this.createElement(TagNames.DIV, Styles.DESCRIPTION_BOTTOM);
  }

  private documentTitle: string = 'About us';

  private aboutSubheaderContent: string = `Final Project of the "JavaScript/Front-end" Course`;

  private aboutDescriptionContent: string = `Welcome to our online store! This e-commerce platform effectively replicates all the advantages of physical stores in a digital format. The system offers an intuitively designed user interface from the product search stage to the moment of order placement, enhancing engagement and building trust among customers.
  The platform simulates a range of high-quality musical equipment. Users can browse detailed product descriptions, add selected items to their cart, and make purchases with maximum convenience. To streamline the process, we offer registration and login options, advanced product search capabilities, as well as categorization and sorting.
  `;

  private featuresSubheaderContent: string = `Features:`;

  private featuresDescriptionContent: string = `
  <ul>
    <li><strong>Developed without the use of frameworks:</strong> Tools and technologies used include Typescript, SCSS, Webpack, Jest, ESLint, Prettier, Husky.</li>
    <li><strong>Responsive Design:</strong> Our website is correctly displayed on various devices, starting from a minimum screen resolution of 360px and remains usable at resolutions down to 250px. This ensures a comfortable shopping experience on any device, even on the oldest ones.</li>
    <li><strong>Vampire protection:</strong> On our website, it's impossible to register if you're over 100 years old, which means no vampire can make a purchase on this store. (Perhaps this point should be removed)</li>
  </ul>
  `;

  // eslint-disable-next-line max-lines-per-function
  public async getHtml(): Promise<HTMLDivElement> {
    const {
      container,
      header,
      projectDescription,
      descriptionLeft,
      descriptionRight,
      descriptionBottom,
    } = this;

    container.append(header);
    header.innerText = 'About us';
    container.append(projectDescription);

    projectDescription.append(descriptionLeft);
    const aboutSubheader = this.createElement(TagNames.H2, Styles.SUBHEADER);
    const aboutParagraph = this.createElement(TagNames.P, Styles.PARAGRAPH);
    descriptionLeft.append(aboutSubheader, aboutParagraph);
    aboutSubheader.innerText = this.aboutSubheaderContent;
    aboutParagraph.innerText = this.aboutDescriptionContent;

    const featuresSubheader = this.createElement(TagNames.H2, Styles.SUBHEADER);
    const featuresParagraph = this.createElement(TagNames.P, Styles.PARAGRAPH);
    descriptionLeft.append(featuresSubheader, featuresParagraph);
    featuresSubheader.innerText = this.featuresSubheaderContent;
    featuresParagraph.innerHTML = this.featuresDescriptionContent;

    projectDescription.append(descriptionRight);
    const teamHeader = this.createElement(TagNames.H2, Styles.SUBHEADER);
    teamHeader.innerHTML = 'Our team';
    descriptionRight.append(
      teamHeader,
      this.createCard(
        '../assets/img/about-us/boris-novi.jpeg',
        'https://github.com/geominerr',
        'Maksim',
        'Developer 1',
        'decription'
      ),
      this.createCard(
        '../assets/img/about-us/boris-novi.jpeg',
        'https://github.com/BorisNovi',
        'Boris',
        'Developer 2',
        'You'
      ),
      this.createCard(
        '../assets/img/about-us/boris-novi.jpeg',
        'https://github.com/IMcQueenI',
        'Maksim',
        'Developer 3',
        'decription'
      )
    );

    projectDescription.append(descriptionBottom);
    const rsLink = this.createElement(TagNames.A, Styles.RS_LINK);
    const rsImage = this.createElement(TagNames.IMG, Styles.RS_IMG);
    rsLink.setAttribute(Attributes.HREF, 'https://rs.school/');
    rsLink.setAttribute(Attributes.TARGET, '_blank');
    rsImage.setAttribute(Attributes.SRC, '../assets/svg/rs_school_js.svg');
    rsLink.append(rsImage);
    descriptionBottom.append(rsLink);

    return container;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }

  private createCard(
    photo: string,
    link: string,
    name: string,
    position: string,
    description: string
  ): HTMLDivElement {
    const card = document.createElement(TagNames.DIV);
    card.classList.add(Styles.DEV_CARD);

    const photoContainer = this.createElement(TagNames.DIV, Styles.PHOTO_CONTAINER);
    const cardImage = this.createElement(TagNames.IMG, Styles.PHOTO);
    cardImage.setAttribute(Attributes.ALT, 'Developer photo');
    cardImage.setAttribute(Attributes.SRC, photo);
    photoContainer.append(cardImage);

    const descriptionConatainer = this.createElement(TagNames.DIV, Styles.DESCRIPTION_CONTAINER);
    const cardHeading = this.createElement(TagNames.H3, Styles.CARD_HEADING);
    cardHeading.innerText = name;
    const cardPosition = this.createElement(TagNames.P, Styles.CARD_POSITION);
    cardPosition.innerText = position;
    const cardDescription = this.createElement(TagNames.P, Styles.CARD_DESCRIPTION);
    cardDescription.innerText = description;
    const githubLink = this.createElement(TagNames.A, Styles.GH_LINK);
    githubLink.setAttribute(Attributes.HREF, link);
    githubLink.setAttribute(Attributes.TARGET, '_blank');
    githubLink.innerText = `${position}'s Github`;
    descriptionConatainer.append(cardHeading, cardPosition, cardDescription, githubLink);

    card.append(photoContainer, descriptionConatainer);
    return card;
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}
