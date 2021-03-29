import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="dns-prefetch" href="//use.typekit.net" />

                    <script src="https://use.typekit.net/uur7rpg.js" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                'try{Typekit.load({ async: false });}catch(e){}',
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
