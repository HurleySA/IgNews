import { render, screen } from '@testing-library/react'
import { SignInButton } from './'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'

jest.mock("next-auth/client");

describe("SignInButton component", () => {
    it('renders correctly when user is not logged', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([null, false]);

        render(
            <SignInButton/>
        )
    
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('render the name of user logged', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([{user: {name: 'John Doe', email:"john@teste.com"}, expires: 'fake-expires'}, false]);
        render(<SignInButton/>);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    })
    
})

