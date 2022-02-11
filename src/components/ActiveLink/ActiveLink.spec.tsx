import { render } from '@testing-library/react'
import { debug } from 'console'
import { ActiveLink } from './'

jest.mock("next/router", () => {
    return {
        useRouter(){
            return {
                asPath:'/'
            }
        }
    }
});

test('active link renders correctly', () => {
    const { getByText} = render(
        <ActiveLink href="/" activeClassName='active'>
            <a>Home</a>
        </ActiveLink>
    )

    expect(getByText('Home')).toBeInTheDocument()
})

test('active link is receiving active class', () => {
    const { getByText} = render(
        <ActiveLink href="/" activeClassName='active'>
            <a>Home</a>
        </ActiveLink>
    )

    expect(getByText('Home')).toHaveClass('active')
})