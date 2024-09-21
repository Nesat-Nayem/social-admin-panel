import Label from 'components/label';
import { USER_ROLES } from 'utils/constants';
// routes
import Iconify from 'components/iconify';
import { PATH_DASHBOARD } from 'routes/paths';
// components
import SvgColor from 'components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const VSONavConfig = [
  {
    subheader: 'VSO ',
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.vso.vso,
        // icon: ICONS.dashboard
      },
      {
        title: 'Visit',
        path: PATH_DASHBOARD.vso.main,
        // icon: ICONS.ecommerce
      },
      {
        title: 'Meeting',
        path: PATH_DASHBOARD.vso.meeting,
        // icon: ICONS.ecommerce
      },

      // {
      //   title: 'VSO Visit',
      //   path: PATH_DASHBOARD.vso.visit,
      //   // icon: ICONS.ecommerce
      // },
    ],
  },
];

const AdminNavConfig = [
  {
    subheader: 'ADMIN',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.admin.admin, icon: ICONS.dashboard },

      {
        title: 'Register Master',
        path: PATH_DASHBOARD.vsomaster.root,
        icon: ICONS.invoice,
        children: [
          { title: 'VSO', path: PATH_DASHBOARD.vsomaster.list },
          { title: 'Manager', path: PATH_DASHBOARD.managermaster.list },
          { title: 'Client', path: PATH_DASHBOARD.doctormaster.list },
        ],
      },

      {
        title: 'Medicine Master',
        path: PATH_DASHBOARD.inventorymaster.root,
        icon: ICONS.invoice,
        children: [{ title: 'Medicine', path: PATH_DASHBOARD.inventorymaster.list }],
      },
      {
        title: 'Inventory Management',
        path: PATH_DASHBOARD.InventoryManagement.root,
        icon: ICONS.user,
        // children: [{ title: '', path: PATH_DASHBOARD.inventorymaster.list }],
      },
      {
        title: 'Cites',
        path: PATH_DASHBOARD.Cityes.root,
        icon: ICONS.user,
        // children: [{ title: 'Medicine', path: PATH_DASHBOARD.inventorymaster.list }],
      },

      {
        title: 'Sample Master',
        path: PATH_DASHBOARD.samplemaster.root,
        icon: ICONS.invoice,
        children: [{ title: 'Sample', path: PATH_DASHBOARD.samplemaster.list }],
      },
      {
        title: 'Vehicle Master',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.invoice,
        children: [{ title: 'Vehicle', path: PATH_DASHBOARD.vehiclemaster.list }],
      },

      {
        title: 'Meeting Master',
        path: PATH_DASHBOARD.admin.root,
        icon: ICONS.invoice,
        children: [{ title: 'Meeting', path: PATH_DASHBOARD.meetingmaster.list }],
      },
      {
        title: 'Gift Master',
        path: PATH_DASHBOARD.giftmaster.root,
        icon: ICONS.invoice,
        children: [{ title: 'Gift', path: PATH_DASHBOARD.giftmaster.list }],
      },
      // { title: 'Business Report', path: PATH_DASHBOARD.businessreport.list, icon: ICONS.dashboard },
      {
        title: 'Business Report',
        path: PATH_DASHBOARD.businessreport.manager,
        icon: ICONS.invoice,
        children: [
          { title: 'Manager', path: PATH_DASHBOARD.businessreport.manager },
          { title: 'Doctor', path: PATH_DASHBOARD.businessreport.doctor },
          { title: 'Vso', path: PATH_DASHBOARD.businessreport.vso },
          { title: 'Medicine', path: PATH_DASHBOARD.businessreport.medicine },
          { title: 'Sample', path: PATH_DASHBOARD.businessreport.sample },
          { title: 'Gift', path: PATH_DASHBOARD.businessreport.gift },
          { title: 'Vso Vist', path: PATH_DASHBOARD.businessreport.vsovisit },
          { title: 'Meeting Create', path: PATH_DASHBOARD.businessreport.createmeeting },
          { title: 'Meeting Submit', path: PATH_DASHBOARD.businessreport.submitmeeting },
        ],
      },
    ],
  },
];

const DoctorNavConfig = [
  {
    subheader: 'DOCTOR',
    items: [
      // { title: 'Doctor Dashboard', path: PATH_DASHBOARD.doctor.doctor, icon: ICONS.dashboard },
      // { title: 'Doctor Profile', path: PATH_DASHBOARD.doctor.profile, icon: ICONS.ecommerce },

      {
        title: 'Doctor Transaction Page',
        path: PATH_DASHBOARD.doctor.transaction,
        icon: ICONS.booking,
      },
    ],
  },
];

const ManagerNavConfig = [
  {
    subheader: 'MANAGER',
    items: [
      {
        title: 'Visit',
        path: PATH_DASHBOARD.manager.main,
        // icon: ICONS.ecommerce
      },
      {
        title: 'Manage VSO',
        path: PATH_DASHBOARD.manager.vsoaccess,
        // icon: ICONS.ecommerce
      },
      // { title: 'Manager Dashboard', path: PATH_DASHBOARD.manager.main, icon: ICONS.dashboard },
      // { title: 'Manager Profile', path: PATH_DASHBOARD.manager.profile, icon: ICONS.ecommerce },
      // {
      //   title: 'Manager Report & Expenses Generation',
      //   path: PATH_DASHBOARD.manager.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'Visit Report Start Km', path: PATH_DASHBOARD.manager.start },
      //     { title: 'Visit Report End Km', path: PATH_DASHBOARD.manager.end },
      //   ],
      // },
      // {
      //   title: 'Manager Visit Report & Expenses Generation',
      //   path: PATH_DASHBOARD.manager.report,
      //   icon: ICONS.invoice,
      // },
      // {
      //   title: 'Manager Visit ',
      //   path: PATH_DASHBOARD.manager.main,
      //   icon: ICONS.invoice,
      // },
    ],
  },
];

const navConfig = [
  {
    role: USER_ROLES.ADMIN,
    values: AdminNavConfig,
  },

  {
    role: USER_ROLES.VSO,
    values: VSONavConfig,
  },
  {
    role: USER_ROLES.MANAGER,
    values: ManagerNavConfig,
  },
  {
    role: USER_ROLES.DOCTOR,
    values: DoctorNavConfig,
  },
];

const navConfigs = [
  // CRM
  // ----------------------------------------------------------------------
  {
    subheader: 'VSO ',
    items: [
      { title: 'VSO Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'VSO Profile', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      {
        title: 'VSO Visit Entry Page',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'Report and Expense', path: PATH_DASHBOARD.invoice.list },
          { title: 'Report Entry', path: PATH_DASHBOARD.invoice.demoView },
        ],
      },
      { title: 'VSO  Vist Exit', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  {
    subheader: 'VSO ',
    items: [
      { title: 'VSO Dashboard', path: PATH_DASHBOARD.vso.vso, icon: ICONS.dashboard },
      { title: 'VSO Profile jjddj', path: PATH_DASHBOARD.vso.profile, icon: ICONS.ecommerce },
      { title: 'VSO Visit', path: PATH_DASHBOARD.vso.visit, icon: ICONS.ecommerce },
      {
        title: 'VSO Visit Entry Page',
        path: PATH_DASHBOARD.vso.root,
        icon: ICONS.invoice,
        children: [
          { title: 'Report and Expense', path: PATH_DASHBOARD.vso.reportexpense },
          { title: 'Report Entry', path: PATH_DASHBOARD.vso.reportentry },
        ],
      },
      { title: 'VSO  Vist Exit', path: PATH_DASHBOARD.vso.exit, icon: ICONS.booking },
    ],
  },

  {
    subheader: 'MANAGER',
    items: [
      { title: 'Manager Dashboard', path: PATH_DASHBOARD.manager.main, icon: ICONS.dashboard },
      {
        title: 'Manager Report & Expenses Generation',
        path: PATH_DASHBOARD.manager.root,
        icon: ICONS.invoice,
        children: [
          { title: 'Visit Report Start Km', path: PATH_DASHBOARD.manager.start },
          { title: 'Visit Report End Km', path: PATH_DASHBOARD.manager.end },
        ],
      },
    ],
  },
  // GENERAL

  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'file', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    ],
  },

  // MANAGEMENT

  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },

      // E-COMMERCE
      {
        title: 'ecommerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },

      // INVOICE
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },

      // BLOG
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'File manager',
        path: PATH_DASHBOARD.fileManager,
        icon: ICONS.folder,
      },
    ],
  },

  // APP

  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: <Label color="error">+32</Label>,
      },
      {
        title: 'chat',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
      },
      {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      {
        title: 'kanban',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },

  // DEMO MENU STATES
  {
    subheader: 'Other cases',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'item_by_roles',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.lock,
        roles: ['admin'],
        caption: 'only_admin_can_see_this_item',
      },
      {
        title: 'menu_level',
        path: '#/dashboard/menu_level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'menu_level_2a',
            path: '#/dashboard/menu_level/menu_level_2a',
          },
          {
            title: 'menu_level_2b',
            path: '#/dashboard/menu_level/menu_level_2b',
            children: [
              {
                title: 'menu_level_3a',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3a',
              },
              {
                title: 'menu_level_3b',
                path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b',
                children: [
                  {
                    title: 'menu_level_4a',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a',
                  },
                  {
                    title: 'menu_level_4b',
                    path: '#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'item_disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },

      {
        title: 'item_label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
            NEW
          </Label>
        ),
      },
      {
        title: 'item_caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'item_external_link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
      },
      {
        title: 'blank',
        path: PATH_DASHBOARD.blank,
        icon: ICONS.blank,
      },
    ],
  },
];

export default navConfig;
