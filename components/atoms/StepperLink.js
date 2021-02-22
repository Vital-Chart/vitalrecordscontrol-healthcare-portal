import { useRouter } from 'next/router'
import cx from 'classnames'
import { Link } from '@/components/core'

export const StepperLink = ({ children, href, className, ...props }) => {
    const router = useRouter()
    console.log(router.pathname)
    console.log(href)
    return (
        <Link
            href={href}
            className={cx(
                router.pathname === href
                    ? 'font-bold text-black transition-colors'
                    : 'text-gray',
                'hover:text-black',
                className
            )}
            {...props}
        >
            {children}
        </Link>
    )
}

export default StepperLink
