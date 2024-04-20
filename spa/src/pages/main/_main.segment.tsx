import { MainSegmentLayout } from '@/pages/main/_main-segment.layout';
import { Outlet } from 'react-router-dom';

export default function MainSegment() {
  return (
    <MainSegmentLayout>
      <Outlet />
    </MainSegmentLayout>
  );
}
