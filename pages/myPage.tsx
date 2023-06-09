import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useQueryUserPost } from '@/hooks/post/useQueryUserPost';
import { PostBox } from '@/components/features/post/PostBox';
import { useQueryUser } from '@/hooks/user/useQueryUser';
import Image from 'next/image';
import Link from 'next/link';
import { PaginationBox } from '@/components/common/PaginationBox';
import { countPages } from '@/utils/countPages';
import { TabsBox } from '@/components/elements/TabsBox';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserEditMenuBox } from '@/components/features/user/UserEditMenuBox';
import NoimageUser from '@/images/noimage-user.png';
import { useQueryFollow } from '@/hooks/follow/useQueryFollow';
import { FollowsBox } from '@/components/features/follow/FollowsBox';

const myPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFollowPage, setCurrentFollowPage] = useState(1);
  const { data: userPosts, refetch: userPostsRefetch } = useQueryUserPost(currentPage, 10);
  const { data: user } = useQueryUser();
  const { data: follow, refetch: followRefetch } = useQueryFollow(currentFollowPage, 10);

  const [selectTab, setSelectTab] = useState(0);
  const [followsFlag, setFollowsFlag] = useState(false);
  const [selectLabel, setSelectLabel] = useState(0);

  // ページネーションで都道府県別投稿のAPI再取得
  useEffect(() => {
    userPostsRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // タブ切り替えしたらページを1ページ目に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [selectTab]);

  // フォローモーダルのページネーションでフォローAPI再取得
  useEffect(() => {
    followRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFollowPage]);

  // フォローモーダルのタブ切り替えでフォローモーダルを1ページに戻す
  useEffect(() => {
    setCurrentFollowPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLabel]);

  const StartDateUse = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日にアカウント作成しています。`;
  };

  return (
    <main css={myPageBox}>
      {user !== undefined ? (
        <div css={topBox}>
          <h2>マイページ</h2>
          <div css={userBox}>
            <div css={userImgBox}>
              {user.image !== '' ? (
                <Image src={user.image} fill sizes="(max-width: 70px)" alt="ユーザー画像" />
              ) : (
                <Image src={NoimageUser} fill sizes="(max-width: 70px)" alt="ユーザー画像" />
              )}
            </div>
            <span className="userBox__name">{user.name}</span>
            <div className="userBox__editBox">
              <UserEditMenuBox />
            </div>
          </div>
          <span className="myPageBox__created">{StartDateUse(user.created_at)}</span>
          <div css={countBox}>
            <span
              onClick={() => {
                setSelectLabel(0);
                setFollowsFlag(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              フォロー数: {follow?.followTotalPageCount}
            </span>
            <span
              onClick={() => {
                setSelectLabel(1);
                setFollowsFlag(true);
              }}
              style={{ cursor: 'pointer' }}
            >
              フォロワー数: {follow?.followerTotalPageCount}
            </span>

            {follow !== undefined && (
              <FollowsBox
                open={followsFlag}
                setOpen={() => setFollowsFlag(false)}
                selectLabel={selectLabel}
                setSelectLabel={setSelectLabel}
                follow={follow}
                followRefetch={followRefetch}
                currentFollowPage={currentFollowPage}
                setCurrentFollowPage={setCurrentFollowPage}
              />
            )}
          </div>
          <div css={countBox}>
            <span>投稿数: {userPosts?.totalPageCount}</span>
            <span>いいね数: {userPosts?.totalLikeCount}</span>
          </div>
          <TabsBox
            labels={['投稿', 'いいね']}
            icon={[<CreateIcon key="CreateIcon" />, <FavoriteIcon key="FavoriteIcon" />]}
            selectTab={selectTab}
            setSelectTab={setSelectTab}
          />
          <PostBox
            posts={selectTab === 0 ? userPosts?.posts : userPosts?.likePosts}
            user={user}
            refetch={userPostsRefetch}
          />
          {selectTab === 0
            ? userPosts &&
              userPosts?.posts.length <= 0 && (
                <span className="topBox__notExist">まだ投稿がありません。</span>
              )
            : userPosts &&
              userPosts?.likePosts.length <= 0 && (
                <span className="topBox__notExist">まだいいねがありません。</span>
              )}
        </div>
      ) : (
        <>
          <h2>ログインしていない場合マイページは閲覧できません。</h2>
          <Link className="authLink" href="/auth">
            ログイン画面へ
          </Link>
        </>
      )}
      {userPosts && (
        <PaginationBox
          count={countPages(selectTab === 0 ? userPosts.totalPageCount : userPosts.totalLikeCount)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </main>
  );
};

export default myPage;

const myPageBox = css`
  padding: 40px 80px;

  @media (max-width: 768px) {
    padding: 20px 40px;
  }

  @media (max-width: 425px) {
    padding: 20px 14px;
  }

  h2 {
    margin: 20px 0;
    text-align: center;
  }

  .myPageBox__created {
    margin: 20px 0;
    display: block;
    color: #aaa;
    font-size: 14px;
  }

  .authLink {
    margin: 30px auto;
    padding: 12px;
    display: block;
    width: fit-content;
    color: #0095d9;
    font-size: 18px;
    text-decoration: none;
    border: 1px solid #0095d9;
    border-radius: 20px;
  }
`;

const topBox = css`
  margin: 0 auto;
  max-width: 1200px;

  .topBox__notExist {
    margin: 20px 0;
    display: block;
    text-align: center;
  }
`;

const userBox = css`
  display: flex;
  align-items: center;
  position: relative;

  .userBox__name {
    font-size: 18px;
    word-wrap: break-word;
    width: 54%;

    @media (max-width: 425px) {
      font-size: 14px;
    }
  }

  .userBox__editBox {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const countBox = css`
  margin: 20px 0;
  display: flex;
  align-items: center;
  width: 100%;

  span {
    &:nth-of-type(1) {
      margin-right: 12px;
    }
  }
`;

const userImgBox = css`
  margin-right: 12px;
  width: 70px;
  height: 70px;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
