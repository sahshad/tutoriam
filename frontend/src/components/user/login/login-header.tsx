import { Link } from 'react-router-dom'
import { Button } from '../../ui/button'

interface HeaderProps {
    signState: 'signIn' | 'signUp'
    setSignState:(state: 'signIn' | 'signUp')=> void
  }

const Header:React.FC<HeaderProps> = ({signState,setSignState}) => {
      
  return (
         <header className="flex justify-between p-6">
          <Link to="/">
          <div className="font-bold text-xl">TUTORIAM</div>
          </Link>
          <div className="flex items-center gap-2">
            <span className=" hidden md:flex text-sm text-muted-foreground">{signState === 'signIn'?"Don't have account?":"Already have account"}</span>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={() => setSignState(signState === 'signIn' ? 'signUp' : 'signIn')}
            >
              {signState === 'signIn' ? 'Create Account' : 'Login'}
            </Button>
          </div>
        </header>
  )
}

export default Header