import { ISliderItem } from '@/components/MainSlider/types';
import { getClient } from '@/graphql/clients/serverSideClient';
import { GET_TOP_BANNER } from '@/graphql/queries/sliders';
import { GetTopBannerQuery } from '@/graphql/types/graphql';
import { Container } from '@mui/material';
import { Header } from '../Header';
import { DesktopHeader } from '../Header/components';
import MobileHeader from '../Header/components/MobileHeader';
import TopBanner from '../Header/components/TopBanner';
import { DesktopView, MobileView } from '../ResponsiveDesign';

const getTopBanner = async () => {
  const { data } = await getClient().query<GetTopBannerQuery>({
    query: GET_TOP_BANNER,
  });

  const _item = data?.sliderCategories?.nodes?.[0]?.sliders?.edges?.[0]?.node;
  if (_item && _item?.featuredImage?.node.url) {
    const data: ISliderItem = {
      id: _item.id,
      imageUrl: _item.featuredImage?.node.url,
      url: _item.url,
      title: _item.title!,
    };
    return data;
  }

  return null;
};

const MainLayoutHeader = async () => {
  const topBanner = await getTopBanner();

  return (
    <Header>
      {topBanner && <TopBanner data={topBanner} />}
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
