import NextErrorComponent from 'next/error'
import * as Sentry from '@sentry/node'

const Error = ({ statusCode, hasGetInitialPropsRun, err }) => {
    if (!hasGetInitialPropsRun && err) {
        Sentry.captureException(err)
    }

    return <NextErrorComponent statusCode={statusCode} />
}

Error.getInitialProps = async ({ res, err, asPath }) => {
    const errorInitialProps = await NextErrorComponent.getInitialProps({
        res,
        err,
    })

    // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
    // getInitialProps has run
    errorInitialProps.hasGetInitialPropsRun = true

    // Running on the server, the response object (`res`) is available.
    //
    // Next.js will pass an err on the server if a page's data fetching methods
    // threw or returned a Promise that rejected
    //
    // Running on the client (browser), Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html

    if (err) {
        Sentry.captureException(err)

        // Flushing before returning is necessary if deploying to Vercel, see
        // https://vercel.com/docs/platform/limits#streaming-responses
        await Sentry.flush(2000)

        return errorInitialProps
    }

    // If this point is reached, getInitialProps was called without any
    // information about what the error might be. This is unexpected and may
    // indicate a bug introduced in Next.js, so record it in Sentry
    Sentry.captureException(
        new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
    )
    await Sentry.flush(2000)

    return errorInitialProps
}

// export async function getStaticProps({ res, err }) {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404

//     return {
//         props: {
//             error: true,
//             statusCode,
//         },
//     }
// }

export default Error
