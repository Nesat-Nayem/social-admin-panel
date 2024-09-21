// ----------------------------------------------------------------------

// import { Cityes } from './elements';

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },

  // CRM PATH START HERE

  admin: {
    admin: path(ROOTS_DASHBOARD, '/admin'),
    root: path(ROOTS_DASHBOARD, '/incentive'),
    two: path(ROOTS_DASHBOARD, '/incentive/two'),
    four: path(ROOTS_DASHBOARD, '/incentive/four'),
  },

  vsomaster: {
    root: path(ROOTS_DASHBOARD, '/vso-master'),
    new: path(ROOTS_DASHBOARD, '/vso-master/new'),
    list: path(ROOTS_DASHBOARD, '/vso-master/list'),
    cards: path(ROOTS_DASHBOARD, '/vso-master/cards'),
    profile: path(ROOTS_DASHBOARD, '/vso-master/profile'),
    account: path(ROOTS_DASHBOARD, '/vso-master/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/vso-master/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/vso-master/reece-chung/edit`),
  },

  managermaster: {
    root: path(ROOTS_DASHBOARD, '/manager-master'),
    new: path(ROOTS_DASHBOARD, '/manager-master/new'),
    list: path(ROOTS_DASHBOARD, '/manager-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/manager-master/${name}/edit`),
  },
  doctormaster: {
    root: path(ROOTS_DASHBOARD, '/doctor-master'),
    new: path(ROOTS_DASHBOARD, '/doctor-master/new'),
    list: path(ROOTS_DASHBOARD, '/doctor-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/doctor-master/${name}/edit`),
  },

  inventorymaster: {
    root: path(ROOTS_DASHBOARD, '/inventory-master'),
    new: path(ROOTS_DASHBOARD, '/inventory-master/new'),
    list: path(ROOTS_DASHBOARD, '/inventory-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/inventory-master/${name}/edit`),
  },

  samplemaster: {
    root: path(ROOTS_DASHBOARD, '/sample-master'),
    new: path(ROOTS_DASHBOARD, '/sample-master/new'),
    list: path(ROOTS_DASHBOARD, '/sample-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/sample-master/${name}/edit`),
  },

  meetingmaster: {
    root: path(ROOTS_DASHBOARD, '/meeting-master'),
    new: path(ROOTS_DASHBOARD, '/meeting-master/new'),
    list: path(ROOTS_DASHBOARD, '/meeting-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/meeting-master/${name}/edit`),
  },
  InventoryManagement: {
    root: path(ROOTS_DASHBOARD, '/inventory-management'),
    new: path(ROOTS_DASHBOARD, '/inventory-management/new'),
    // list: path(ROOTS_DASHBOARD, '/inventory-management/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/inventory-management/${name}/edit`),
  },
  Cityes: {
    root: path(ROOTS_DASHBOARD, '/city-list'),
    // new: path(ROOTS_DASHBOARD, '/cityes/new'),
    new: path(ROOTS_DASHBOARD, '/city-list/cityes'),
    edit: (name) => path(ROOTS_DASHBOARD, `/city-list/${name}/edit`),
  },
  vehiclemaster: {
    root: path(ROOTS_DASHBOARD, '/vehicle-master'),
    new: path(ROOTS_DASHBOARD, '/vehicle-master/new'),
    list: path(ROOTS_DASHBOARD, '/vehicle-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/vehicle-master/${name}/edit`),
  },

  giftmaster: {
    root: path(ROOTS_DASHBOARD, '/gift-master'),
    new: path(ROOTS_DASHBOARD, '/gift-master/new'),
    list: path(ROOTS_DASHBOARD, '/gift-master/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/gift-master/${name}/edit`),
  },

  businessreport: {
    list: path(ROOTS_DASHBOARD, '/business'),
    manager: path(ROOTS_DASHBOARD, '/business/manager-report'),
    medicine: path(ROOTS_DASHBOARD, '/business/medicine-report'),
    sample: path(ROOTS_DASHBOARD, '/business/sample-report'),
    gift: path(ROOTS_DASHBOARD, '/business/gift-report'),
    doctor: path(ROOTS_DASHBOARD, '/business/doctor-report'),
    createmeeting: path(ROOTS_DASHBOARD, '/business/create-meeting-report'),
    submitmeeting: path(ROOTS_DASHBOARD, '/business/submit-meeting-report'),
    vsovisit: path(ROOTS_DASHBOARD, '/business/vso-visit-report'),
    vso: path(ROOTS_DASHBOARD, '/business/vso-report'),
  },

  manager: {
    manager: path(ROOTS_DASHBOARD, '/manager'),
    start: path(ROOTS_DASHBOARD, '/start'),
    end: path(ROOTS_DASHBOARD, '/end'),
    main: path(ROOTS_DASHBOARD, '/manager-visit'),
    vsoaccess: path(ROOTS_DASHBOARD, '/vsoaccess'),
    vsostock: (id) => path(ROOTS_DASHBOARD, `/vsostock/${id}`),
    visitentry: path(ROOTS_DASHBOARD, '/manager-visit-entry'),
    transaction: path(ROOTS_DASHBOARD, `/manager-transaction`),
  },
  vso: {
    vso: path(ROOTS_DASHBOARD, '/vso'),
    visit: path(ROOTS_DASHBOARD, '/vso-visit'),
    main: path(ROOTS_DASHBOARD, '/vso-main'),
    profile: path(ROOTS_DASHBOARD, '/vso-profile'),
    // transaction: path(ROOTS_DASHBOARD, '/vso-transaction'),
    transaction: (name) => path(ROOTS_DASHBOARD, `/vso-transaction/${name}`),
    visitentry: path(ROOTS_DASHBOARD, '/vso-visit-entry'),
    exit: path(ROOTS_DASHBOARD, '/visit-exit'),
    meeting: path(ROOTS_DASHBOARD, '/vso-meeting'),
  },
  doctor: {
    doctor: path(ROOTS_DASHBOARD, '/doctor'),
    transaction: path(ROOTS_DASHBOARD, '/dotor-transaction'),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
