import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Main,
	NextScript,
	Html
} from "next/document";
import { ServerStyleSheet } from "styled-components";

const collectStyles = async (ctx: DocumentContext) => {
	const sheet = new ServerStyleSheet();
	const originalRenderPage = ctx.renderPage;

	try {
		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
			});

		const initialProps = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					{sheet.getStyleElement()}
				</>
			)
		};
	} finally {
		sheet.seal();
	}
};

interface MyDocumentProps extends DocumentInitialProps {
	styles: React.Component;
}

export default class MyDocument extends Document<MyDocumentProps> {
	static async getInitialProps(ctx: DocumentContext) {
		return await collectStyles(ctx);
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
						integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap"
						rel="stylesheet"
					/>
					{this.props.styles}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
