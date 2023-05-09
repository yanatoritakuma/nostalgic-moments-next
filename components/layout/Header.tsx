import { css } from '@emotion/react';
import Head from 'next/head';
import React, { memo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryUser } from '@/hooks/useQueryUser';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { useRouter } from 'next/router';
import HamburgerMenu from '@/components/features/hamburgerMenu/HamburgerMenu.tsx';

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
      <header css={HeaderBox}>
        <div css={HeaderInBox}>
          ロゴ
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
        <HamburgerMenu hambBtn={hambBtn} onClose={() => setHambBtn(false)} />
      </header>
    </>
  );
});

export default Header;

Header.displayName = 'Header';

const HeaderBox = css`
  background-color: #e2e1e1;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

const HeaderInBox = css`
  margin: 0 auto;
  padding: 20px;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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