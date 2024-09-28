import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import 'reactjs-popup/dist/index.css'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import {
  HeaderContainer,
  WebsiteImage,
  ThemeLogoContainer,
  ThemeButton,
  ProfileImage,
  LogoutButton,
  PopUpCard,
  CardText,
  CardButtonContainer,
  CancelButton,
  ConfirmButton,
} from './styledComponents'

const Header = props => {
  const onConfirmLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDark, onChangeTheme} = value
        return (
          <HeaderContainer isDark={isDark}>
            <Link to="/">
              <WebsiteImage
                src={
                  isDark
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt=" website logo"
              />
            </Link>
            <ThemeLogoContainer>
              <ThemeButton
                data-testid="theme"
                type="button"
                onClick={onChangeTheme}
              >
                {isDark ? (
                  <FiSun
                    style={{height: '20px', width: '20px', color: '#ffffff'}}
                  />
                ) : (
                  <FaMoon style={{height: '20px', width: '20px'}} />
                )}
              </ThemeButton>
              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LogoutButton type="button" isDark={isDark}>
                    Logout
                  </LogoutButton>
                }
                contentStyle={{
                  background: isDark ? ' #313131' : '#ffffff',
                  borderRadius: '10px',
                  width: '25%',
                  border: '0px',
                }}
              >
                {close => (
                  <PopUpCard>
                    <CardText isDark={isDark}>
                      Are you sure, you want to logout?
                    </CardText>
                    <CardButtonContainer>
                      <CancelButton
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                        isDark={isDark}
                      >
                        Cancel
                      </CancelButton>
                      <ConfirmButton
                        isDark={isDark}
                        type="button"
                        onClick={onConfirmLogout}
                      >
                        Confirm
                      </ConfirmButton>
                    </CardButtonContainer>
                  </PopUpCard>
                )}
              </Popup>
            </ThemeLogoContainer>
          </HeaderContainer>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}
export default withRouter(Header)
