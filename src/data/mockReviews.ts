import { CustomerReview, Coupon } from '../types/store';

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    customerName: 'Aman Sharma',
    location: 'Brahumpuri, Delhi',
    rating: 5,
    headline: 'Phenomenal tailoring and best price in East Delhi!',
    comment: 'Visited their Brahumpuri store first to check fabric quality, then ordered the Milano Blazer and Sherwani online. The stitching, gold crest buttons, and fit are truly top-notch. Better quality than big malls at half the price.',
    date: '3 days ago',
    verified: true,
    fitFeedback: 'True to Size',
    helpfulVotes: 32
  },
  {
    id: 'rev-02',
    customerName: 'Vikramaditya Rao',
    location: 'Rohini, Delhi',
    rating: 5,
    headline: 'Wore the Imperial Sherwani for my brother’s wedding',
    comment: 'Got non-stop compliments all evening. The black velvet is rich and the zardozi gold work has an opulent antique sheen that looks regal in photos. Fast delivery too.',
    date: '1 week ago',
    verified: true,
    fitFeedback: 'True to Size',
    helpfulVotes: 28
  },
  {
    id: 'rev-03',
    customerName: 'Kabir Malhotra',
    location: 'Noida Sector 62',
    rating: 5,
    headline: 'Streetwear oversized tee is heavy and premium',
    comment: '280 GSM feels substantial and doesn’t shrink after washing. The subtle gold metallic typography gives that luxury look. Customer service on WhatsApp was super quick.',
    date: '2 weeks ago',
    verified: true,
    fitFeedback: 'True to Size',
    helpfulVotes: 19
  },
  {
    id: 'rev-04',
    customerName: 'Mohit Verma',
    location: 'Shahdara, Delhi',
    rating: 4,
    headline: 'Pure Egyptian linen feels amazing in humid weather',
    comment: 'The shirt is lightweight and breathable with very clean stitching. Sizing on L was spot on for my 40-inch chest. Definitely a repeat customer.',
    date: '3 weeks ago',
    verified: true,
    fitFeedback: 'True to Size',
    helpfulVotes: 14
  },
  {
    id: 'rev-05',
    customerName: 'Rohan Mehra',
    location: 'Gurugram DLF Phase 5',
    rating: 5,
    headline: 'Zara Traders delivers on their Best Price Guarantee',
    comment: 'Ordered via UPI with express delivery. Package arrived in 24 hours in Delhi NCR with a luxury garment bag and hanger. Truly impressed with this local brand.',
    date: '1 month ago',
    verified: true,
    fitFeedback: 'True to Size',
    helpfulVotes: 24
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'ZARAGOLD',
    description: 'Flat ₹500 discount on orders above ₹2,999',
    discountType: 'fixed',
    discountValue: 500,
    minOrder: 2999,
    active: true
  },
  {
    code: 'DELHI10',
    description: '10% off for Delhi & NCR residents on any order',
    discountType: 'percentage',
    discountValue: 10,
    minOrder: 1499,
    active: true
  },
  {
    code: 'FESTIVE300',
    description: '₹300 off on festive and ethnic wear',
    discountType: 'fixed',
    discountValue: 300,
    minOrder: 2499,
    active: true
  }
];
