import { MainSegmentLayout } from '@/pages/main/_layout/MainSegment.layout';
import { Outlet } from 'react-router-dom';

export default function MainSegment() {
  return (
    <MainSegmentLayout>
      <Outlet />
    </MainSegmentLayout>
  );
}
