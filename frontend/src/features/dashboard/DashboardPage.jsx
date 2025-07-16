/*
Router component for the dashboard page.

Should fetch the dashboard data and hand the data to the Gallery component.
*/

import { GalleryGrid } from './GalleryGrid.jsx'

const DashboardPage = () => (
  <main className="p-6">
    <GalleryGrid></GalleryGrid>
  </main>
)

export default DashboardPage
