import Document, { Html, Head, Main, NextScript } from 'next/document'
 
class MyDocument extends Document {
  static async getInitialProps(context) { 
    const initialProps = await Document.getInitialProps(context)
    let theme = context?.req?.cookies["Theme"];
    if (theme == undefined || theme == null) {
      theme = 'dark';
    }
  
    // const cookieList = cookies();
  
    const x = {
      ...initialProps,
      // session,
      theme: theme
    };
  
    return x;
   }
 
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </Head>
        <body className={this.props.theme == "dark" ? "dark" : ""}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
 
export default MyDocument