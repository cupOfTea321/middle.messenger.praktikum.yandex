declare module '*.hbs' {
    import {TemplateDelegate} from 'handlebars'

    const template: TemplateDelegate
    export default template
}
// ts для hbs
declare module "*.svg" {
    import { TemplateDelegate } from 'handlebars';

    const template: TemplateDelegate;
    export default template;
}
