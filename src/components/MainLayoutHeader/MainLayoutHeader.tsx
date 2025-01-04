'use client';

import { ISliderItem } from '@/components/MainSlider/types';
import { GET_TOP_BANNER } from '@/graphql/queries/sliders';
import { GetTopBannerQuery } from '@/graphql/types/graphql';
import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { Header } from '../Header';
import { DesktopHeader } from '../Header/components';
import MobileHeader from '../Header/components/MobileHeader';
import TopBanner from '../Header/components/TopBanner';
import { DesktopView, MobileView } from '../ResponsiveDesign';

const MainLayoutHeader = () => {
  const { data } = useQuery<GetTopBannerQuery>(GET_TOP_BANNER);

  const _item = data?.sliderCategories?.nodes?.[0]?.sliders?.edges?.[0]?.node;
  let banner: ISliderItem | null = null;
  if (_item && _item?.featuredImage?.node.url) {
    banner = {
      id: _item.id,
      imageUrl: _item.featuredImage?.node.url,
      url: _item.url,
      title: _item.title!,
    };
  }

  return (
    <Header>
      {banner && <TopBanner data={banner} />}
      <MobileView>
        <MobileHeader />
      </MobileView>
      <Container maxWidth="xl">
        <DesktopView>
          <DesktopHeader />
        </DesktopView>
      </Container>
    </Header>
  );
};

export default MainLayoutHeader;
