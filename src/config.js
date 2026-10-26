// Wreford's WhatsApp number: country code + number, digits only, no + or leading 0 (e.g. 2348012345678)
export const WA_NUMBER = '2348122528330'

// Replace each # with the real profile link or contact info
export const SOCIAL = { tiktok: ' https://www.tiktok.com/@danivisuals.studio?_r=1&_t=ZS-9An9c73Svn2' }

// Contact information
export const CONTACT = { phone: '+2348122528330', email: 'danidecreator@gmail.com' }

export const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
 
// Portfolio items. Photos go in public/images (brands-1.jpg ... events-4.jpg).
// For a video project, paste a YouTube or Vimeo embed link into video, e.g. https://www.youtube.com/embed/VIDEO_ID
export const WORKS = [
  // Brands
  { c: 'Brands', t: 'Brand work', img: '/images/WhatsApp Image 2026-10-25 at 3.35.44 PM.jpeg', video: '' },
  { c: 'Brands', t: 'Brand work', img: '/images/WhatsApp Image 2026-10-25 at 3.35.44 PM (1).jpeg', video: '' },
  { c: 'Brands', t: 'Brand work', img: '/images/WhatsApp Image 2026-10-25 at 3.33.04 PM.jpeg', video: '' },
  { c: 'Brands', t: 'Brand work', img: '/images/WhatsApp Image 2026-10-25 at 3.36.58 PM.jpeg', video: '' },
  // Weddings
  { c: 'Weddings', t: 'Wedding moment', img: '/images/WhatsApp Image 2026-10-25 at 3.25.40 PM.jpeg', video: '' },
  { c: 'Weddings', t: 'Wedding moment', img: '/images/WhatsApp Image 2026-10-25 at 3.17.33 PM (1).jpeg', video: '' },
  { c: 'Weddings', t: 'Wedding moment', img: '/images/WhatsApp Image 2026-10-25 at 3.29.20 PM (1).jpeg', video: '' },
  { c: 'Weddings', t: 'Wedding moment', img: '/images/WhatsApp Image 2026-10-25 at 3.25.41 PM (5).jpeg', video: '' },
  // Events
  { c: 'Events', t: 'Event coverage', img: '/images/WhatsApp Image 2026-10-25 at 3.25.41 PM (2).jpeg', video: '' },
  { c: 'Events', t: 'Event coverage', img: '/images/WhatsApp Image 2026-10-25 at 3.25.41 PM (4).jpeg', video: '' },
  { c: 'Events', t: 'Event coverage', img: '/images/WhatsApp Image 2026-10-25 at 2.58.20 PM.jpeg', video: '' },
  { c: 'Events', t: 'Event coverage', img: '/images/WhatsApp Image 2026-10-25 at 3.25.41 PM.jpeg', video: '' },
]

// Standalone video
export const STANDALONE_VIDEO = {
  title: 'My Video',
  src: '/videos/IMG_2191.mov'
}
