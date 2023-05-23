import { css } from '@emotion/react';
import Head from 'next/head';
import { memo, useState } from 'react';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { useRouter } from 'next/router';
import HamburgerMenu from '@/components/features/hamburgerMenu/HamburgerMenu.tsx';
import HeaderIcon from '@/images/logo.png';

const Header = memo(() => {
  const [hambBtn, setHambBtn] = useState(false);
  const { data: user } = useQueryUser();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>NostalgicMoments</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header css={headerBox}>
        <div css={headerInBox}>
          <div className="headerInBox__logo">
            <Image src={HeaderIcon} fill priority sizes="100%" alt="ロゴ" />
          </div>
          {user !== undefined ? (
            <IconButton onClick={() => setHambBtn(!hambBtn)}>
              {!hambBtn ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
          ) : (
            <div css={BtnBox}>
              <ButtonBox variant="outlined" onClick={() => router.push('/auth')}>
                ログイン
              </ButtonBox>
            </div>
          )}
        </div>
        <HamburgerMenu hambBtn={hambBtn} setHambBtn={setHambBtn} />
      </header>
    </>
  );
});

export default Header;

Header.displayName = 'Header';

const headerBox = css`
  background-color: #e2e1e1;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const headerInBox = css`
  margin: 0 auto;
  padding: 10px 20px;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .headerInBox__logo {
    width: 220px;
    height: 60px;
    position: relative;

    img {
      object-fit: cover;
    }
  }
`;

const BtnBox = css`
  button {
    border-radius: 20px;
    border: 2px solid;
    &:hover {
      border-radius: 20px;
      border: 2px solid;
      opacity: 0.7;
    }
  }
`;
