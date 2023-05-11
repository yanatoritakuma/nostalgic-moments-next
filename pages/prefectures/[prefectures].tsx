import React from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useQueryPrefecturesPost } from '@/hooks/post/useQueryPrefecturesPost';
import NoimageUser from '@/images/noimage-user.png';
import Noimage from '@/images/noimage.png';
import PostBox from '@/components/common/PostBox';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { prefectures: 'hokkaido' } },
      { params: { prefectures: 'aomori' } },
      { params: { prefectures: 'akita' } },
      { params: { prefectures: 'iwate' } },
      { params: { prefectures: 'miyagi' } },
      { params: { prefectures: 'yamagata' } },
      { params: { prefectures: 'niigata' } },
      { params: { prefectures: 'fukushima' } },
      { params: { prefectures: 'ibaraki' } },
      { params: { prefectures: 'tochigi' } },
      { params: { prefectures: 'gunma' } },
      { params: { prefectures: 'saitama' } },
      { params: { prefectures: 'chiba' } },
      { params: { prefectures: 'tokyo' } },
      { params: { prefectures: 'kanagawa' } },
      { params: { prefectures: 'ishikawa' } },
      { params: { prefectures: 'toyama' } },
      { params: { prefectures: 'fukui' } },
      { params: { prefectures: 'yamanashi' } },
      { params: { prefectures: 'nagano' } },
      { params: { prefectures: 'gifu' } },
      { params: { prefectures: 'shizuoka' } },
      { params: { prefectures: 'aichi' } },
      { params: { prefectures: 'mie' } },
      { params: { prefectures: 'shiga' } },
      { params: { prefectures: 'kyoto' } },
      { params: { prefectures: 'osaka' } },
      { params: { prefectures: 'hyogo' } },
      { params: { prefectures: 'nara' } },
      { params: { prefectures: 'wakayama' } },
      { params: { prefectures: 'yamaguchi' } },
      { params: { prefectures: 'tottori' } },
      { params: { prefectures: 'shimane' } },
      { params: { prefectures: 'okayama' } },
      { params: { prefectures: 'hiroshima' } },
      { params: { prefectures: 'tokushima' } },
      { params: { prefectures: 'kagawa' } },
      { params: { prefectures: 'ehime' } },
      { params: { prefectures: 'kochi' } },
      { params: { prefectures: 'fukuoka' } },
      { params: { prefectures: 'saga' } },
      { params: { prefectures: 'nagasaki' } },
      { params: { prefectures: 'kumamoto' } },
      { params: { prefectures: 'oita' } },
      { params: { prefectures: 'kagoshima' } },
      { params: { prefectures: 'miyazaki' } },
      { params: { prefectures: 'okinawa' } },
    ],
    fallback: false,
  };
}

export const getStaticProps = async (context: { params: { prefectures: string } }) => {
  const { prefectures } = context.params;
  return {
    props: { prefectures },
  };
};

type Props = {
  prefectures: string;
};

const Prefectures = (prefectures: Props) => {
  const prefecturesName = prefectures.prefectures;
  const { data: prefecturesPost } = useQueryPrefecturesPost(prefecturesName);

  const prefecturesFormation = (prefecture: string) => {
    switch (prefecture) {
      case 'hokkaido':
        return '北海道';
      case 'aomori':
        return '青森県';
      case 'iwate':
        return '岩手県';
      case 'miyagi':
        return '宮城県';
      case 'akita':
        return '秋田県';
      case 'yamagata':
        return '山形県';
      case 'fukushima':
        return '福島県';
      case 'ibaraki':
        return '茨城県';
      case 'tochigi':
        return '栃木県';
      case 'gunma':
        return '群馬県';
      case 'saitama':
        return '埼玉県';
      case 'chiba':
        return '千葉県';
      case 'tokyo':
        return '東京都';
      case 'kanagawa':
        return '神奈川県';
      case 'niigata':
        return '新潟県';
      case 'toyama':
        return '富山県';
      case 'ishikawa':
        return '石川県';
      case 'fukui':
        return '福井県';
      case 'yamanashi':
        return '山梨県';
      case 'nagano':
        return '長野県';
      case 'gifu':
        return '岐阜県';
      case 'shizuoka':
        return '静岡県';
      case 'aichi':
        return '愛知県';
      case 'mie':
        return '三重県';
      case 'shiga':
        return '滋賀県';
      case 'kyoto':
        return '京都府';
      case 'osaka':
        return '大阪府';
      case 'hyogo':
        return '兵庫県';
      case 'nara':
        return '奈良県';
      case 'wakayama':
        return '和歌山県';
      case 'tottori':
        return '鳥取県';
      case 'shimane':
        return '島根県';
      case 'okayama':
        return '岡山県';
      case 'hiroshima':
        return '広島県';
      case 'yamaguchi':
        return '山口県';
      case 'tokushima':
        return '徳島県';
      case 'kagawa':
        return '香川県';
      case 'ehime':
        return '愛媛県';
      case 'kochi':
        return '高知県';
      case 'fukuoka':
        return '福岡県';
      case 'saga':
        return '佐賀県';
      case 'nagasaki':
        return '長崎県';
      case 'kumamoto':
        return '熊本県';
      case 'oita':
        return '大分県';
      case 'miyazaki':
        return '宮崎県';
      case 'kagoshima':
        return '鹿児島県';
      case 'okinawa':
        return '沖縄県';
    }
  };

  return (
    <main css={PrefecturesBox}>
      <h2>{prefecturesFormation(prefecturesName)}</h2>
      {prefecturesPost?.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Prefectures;

const PrefecturesBox = css`
  padding: 20px;
  width: 100%;

  h2 {
    text-align: center;
  }
`;
