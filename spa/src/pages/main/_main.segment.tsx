import { Outlet } from 'react-router-dom';
import { MainSegmentLayout } from './_layout/MainSegment.layout';

export default function MainSegment() {
  return (
    <MainSegmentLayout>
      <Outlet />
    </MainSegmentLayout>
  );
}
