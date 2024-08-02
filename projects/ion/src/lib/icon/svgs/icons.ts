import {
  access,
  access2,
  activeDeactivate,
  add,
  addSecurity,
  addTelephone,
  addUser,
  alarmClock,
  alarmClockCheck,
  alarmClockMinus,
  alarmClockOff,
  alarmClockPlus,
  alert,
  alertList,
  alertTelephone,
  alertUser,
  announcement,
  arrowsDownUp,
  arrowsLeftRight,
  arrowsUpDown,
  auditForwarded,
  award,
  award2,
  bank,
  bankNote,
  barChartSquareDown,
  barChartSquareMinus,
  barChartSquarePlus,
  barChartSquareUp,
  barCode,
  batteryCharging,
  bellOff,
  bellRinging,
  block,
  bookOpen,
  box,
  box2,
  box3,
  box4,
  box5,
  box6,
  boxBlock,
  boxClock,
  boxLeft,
  boxMinus,
  boxPin,
  boxPlus,
  boxSearch,
  boxX,
  business,
  calendar,
  calendarAdd,
  calendarAttention,
  calendarBlock,
  calendarCheck,
  calendarMarker,
  calendarMoney,
  calendarReserved,
  calendarX,
  camera,
  camera2,
  cameraOff,
  car,
  certificate,
  change,
  changePriority,
  check,
  checkList,
  checkOutlined,
  checkSolid,
  checkUser,
  checkVerified,
  click,
  click2,
  clip,
  clipboard,
  clipboardAlert,
  clipboardCheck,
  clipboardLocalization,
  clipboardPlus,
  clipboardX,
  clockPlus,
  clockSolid,
  clockStopwatch,
  close,
  closeRounded,
  closeSolid,
  cloud,
  cloudDownload,
  cloudUpload,
  coinsHand,
  comeIn,
  comment,
  condominium,
  condominium2,
  config,
  config2,
  convenient,
  coord,
  coordinate,
  copy,
  creditCard,
  creditCardCheck,
  creditCardLock,
  creditCardPlus,
  creditCardShield,
  creditCardX,
  cto,
  cursor,
  database,
  diamond,
  displace,
  divide,
  doc,
  docAdd,
  docBar,
  docCheck,
  docClose,
  docDownload,
  docEmpty,
  docGraphic,
  docQuestion,
  docSearch,
  docWarning,
  down,
  down3,
  download,
  edit2,
  exclamation,
  exclamationRounded,
  exclamationSolid,
  expand,
  faceFrown,
  faceHappy,
  faceId,
  faceNeutral,
  faceSad,
  faceSmile,
  fastBackward,
  fastForward,
  fileLock,
  fileShield,
  filter,
  fingerprint,
  flag,
  forwardedService,
  gift,
  globe1,
  globe2,
  graphic,
  graphic2,
  graphic3,
  group,
  hand,
  headset,
  heart,
  heartHand,
  historic,
  home,
  homeCheck,
  homeDown,
  homeLocalization,
  homeUp,
  homeUpdate,
  homeX,
  hook,
  horizontal,
  horizontalBarChart,
  image,
  imageCheck,
  imageDown,
  imageLeft,
  imagePlus,
  imageRight,
  imageUp,
  imageX,
  inbox,
  info,
  infoSolid,
  information,
  intersection,
  key,
  laptop,
  layoutAlt,
  layoutBottom,
  layoutGrid,
  layoutGrid2,
  layoutLeft,
  layoutRight,
  left,
  left2,
  left3,
  lightbulb,
  lineChartDown,
  lineChartUp,
  link,
  linkBroken,
  list,
  list2,
  listX,
  localization,
  lockUnlocked,
  mail,
  map,
  markerPin,
  maximize,
  messageAlert,
  messageBallon,
  messageChat,
  messageCheck,
  messageHeart,
  messagePlus,
  messageQuestionCircle,
  messageText,
  messageX,
  microphone,
  microphoneOff,
  minimize,
  modem,
  module,
  moduleBox,
  money,
  monitor,
  more,
  motorcycle,
  move,
  negotiation,
  negotiationBlock,
  netflix,
  notification,
  olt,
  onu,
  option,
  orderBottom,
  orderGeneric,
  orderLetter1,
  orderLetter2,
  orderNumber1,
  orderNumber2,
  orderUp,
  out,
  passcode,
  pause,
  pencil,
  percent,
  phoneBlock,
  phoneCall,
  phoneCall2,
  phoneHangUp,
  phoneIncoming,
  phoneOutgoing,
  phoneOutgoing1,
  phonePause,
  phoneRefresh,
  photo,
  pin,
  pin2,
  pix,
  play,
  plus,
  plusSolid,
  presentationChart,
  printer,
  process,
  qrcode,
  questionRounded,
  radio,
  receipt,
  receiptCheck,
  receiveTelephone,
  recording1,
  recording2,
  refresh,
  regions,
  registrationList,
  removeTelephone,
  removeUser,
  repeat,
  restore,
  right,
  right2,
  right3,
  rota,
  sale,
  sandwich,
  save,
  scan,
  search,
  searchLocalization,
  security,
  semiDown,
  semiUp,
  send,
  serial,
  server,
  serviceInternet,
  servicePhone,
  serviceTv,
  share,
  shield,
  shieldOff,
  shieldTick,
  shoppingCart,
  simcard,
  smartphone,
  sortAsc,
  sortDesc,
  speedometer,
  star,
  starSolid,
  stb,
  stop,
  sub,
  submit,
  tag,
  tagDivision,
  target,
  target3,
  technical,
  telephone,
  thumbsDown,
  thumbsUp,
  ticket,
  time,
  timeTelephone,
  total,
  trash,
  trophy,
  tv,
  union,
  up,
  up3,
  upload,
  user,
  userBlock,
  userBottom,
  userClock,
  userLeft,
  userMarker,
  userMinus,
  userRight,
  userSearch,
  userTop,
  verificationSecurity,
  vertical,
  view,
  viewBlock,
  volumeMax,
  volumeMinus,
  volumePlus,
  volumeX,
  wait,
  waitCheck,
  waitWarning,
  wallet,
  watchCircle,
  whatsapp,
  wifi,
  workBag,
  working,
  zap,
  zapOff,
  zoomIn,
  zoomOut,
} from './iconsText';

// To add an icon, use kebab-case on key name and insert only SVG paths on value
export const iconsPaths: Record<string, string> = {
  access,
  access2,
  'active-deactivate': activeDeactivate,
  'add-security': addSecurity,
  'add-telephone': addTelephone,
  'add-user': addUser,
  add,
  'alarm-clock-check': alarmClockCheck,
  'alarm-clock-minus': alarmClockMinus,
  'alarm-clock-off': alarmClockOff,
  'alarm-clock-plus': alarmClockPlus,
  'alarm-clock': alarmClock,
  'alert-list': alertList,
  'alert-telephone': alertTelephone,
  'alert-user': alertUser,
  alert,
  announcement,
  'arrows-down-up': arrowsDownUp,
  'arrows-left-right': arrowsLeftRight,
  'arrows-up-down': arrowsUpDown,
  auditForwarded,
  award,
  award2,
  'bank-note': bankNote,
  bank,
  'bar-chart-square-down': barChartSquareDown,
  'bar-chart-square-minus': barChartSquareMinus,
  'bar-chart-square-plus': barChartSquarePlus,
  'bar-chart-square-up': barChartSquareUp,
  'bar-code': barCode,
  'battery-charging': batteryCharging,
  'bell-off': bellOff,
  'bell-ringing': bellRinging,
  block,
  'book-open': bookOpen,
  'box-block': boxBlock,
  'box-clock': boxClock,
  'box-left': boxLeft,
  'box-minus': boxMinus,
  'box-pin': boxPin,
  'box-plus': boxPlus,
  'box-search': boxSearch,
  'box-x': boxX,
  box,
  box2,
  box3,
  box4,
  box5,
  box6,
  business,
  'calendar-add': calendarAdd,
  'calendar-attention': calendarAttention,
  'calendar-block': calendarBlock,
  'calendar-check': calendarCheck,
  'calendar-marker': calendarMarker,
  'calendar-money': calendarMoney,
  'calendar-reserved': calendarReserved,
  'calendar-x': calendarX,
  calendar,
  'camera-off': cameraOff,
  camera,
  camera2,
  car,
  certificate,
  change,
  'change-priority': changePriority,
  'check-list': checkList,
  'check-outlined': checkOutlined,
  'check-solid': checkSolid,
  'check-user': checkUser,
  'check-verified': checkVerified,
  check,
  click,
  click2,
  clip,
  'clipboard-alert': clipboardAlert,
  'clipboard-check': clipboardCheck,
  'clipboard-plus': clipboardPlus,
  'clipboard-localization': clipboardLocalization,
  'clipboard-x': clipboardX,
  clipboard,
  'clock-plus': clockPlus,
  'clock-solid': clockSolid,
  'clock-stopwatch': clockStopwatch,
  'close-rounded': closeRounded,
  'close-solid': closeSolid,
  close,
  'cloud-download': cloudDownload,
  'cloud-upload': cloudUpload,
  cloud,
  'coins-hand': coinsHand,
  'come-in': comeIn,
  comment,
  condominium,
  condominium2,
  config,
  config2,
  convenient,
  coord,
  coordinate,
  copy,
  'credit-card-check': creditCardCheck,
  'credit-card-lock': creditCardLock,
  'credit-card-plus': creditCardPlus,
  'credit-card-shield': creditCardShield,
  'credit-card-x': creditCardX,
  'credit-card': creditCard,
  cto,
  cursor,
  database,
  diamond,
  displace,
  divide,
  'doc-add': docAdd,
  'doc-bar': docBar,
  'doc-check': docCheck,
  'doc-close': docClose,
  'doc-download': docDownload,
  'doc-empty': docEmpty,
  'doc-graphic': docGraphic,
  'doc-question': docQuestion,
  'doc-search': docSearch,
  'doc-warning': docWarning,
  doc,
  down,
  down3,
  download,
  edit2,
  'exclamation-rounded': exclamationRounded,
  'exclamation-solid': exclamationSolid,
  exclamation,
  expand,
  'face-frown': faceFrown,
  'face-happy': faceHappy,
  'face-id': faceId,
  'face-neutral': faceNeutral,
  'face-sad': faceSad,
  'face-smile': faceSmile,
  'fast-backward': fastBackward,
  'fast-forward': fastForward,
  'file-lock': fileLock,
  'file-shield': fileShield,
  filter,
  fingerprint,
  flag,
  'forwarded-service': forwardedService,
  gift,
  globe1,
  globe2,
  graphic,
  graphic2,
  graphic3,
  group,
  hand,
  headset,
  'heart-hand': heartHand,
  heart,
  historic,
  'home-check': homeCheck,
  'home-down': homeDown,
  'home-localization': homeLocalization,
  'home-up': homeUp,
  'home-update': homeUpdate,
  'home-x': homeX,
  home,
  hook,
  'horizontal-bar-chart': horizontalBarChart,
  horizontal,
  'image-check': imageCheck,
  'image-down': imageDown,
  'image-left': imageLeft,
  'image-plus': imagePlus,
  'image-right': imageRight,
  'image-up': imageUp,
  'image-x': imageX,
  image,
  inbox,
  'info-solid': infoSolid,
  info,
  information,
  intersection,
  key,
  laptop,
  'layout-alt': layoutAlt,
  'layout-bottom': layoutBottom,
  'layout-grid': layoutGrid,
  'layout-grid2': layoutGrid2,
  'layout-left': layoutLeft,
  'layout-right': layoutRight,
  left,
  left2,
  left3,
  lightbulb,
  'line-chart-down': lineChartDown,
  'line-chart-up': lineChartUp,
  'link-broken': linkBroken,
  link,
  'list-x': listX,
  list,
  list2,
  localization,
  'lock-unlocked': lockUnlocked,
  mail,
  map,
  'marker-pin': markerPin,
  maximize,
  'message-alert': messageAlert,
  'message-ballon': messageBallon,
  'message-chat': messageChat,
  'message-check': messageCheck,
  'message-heart': messageHeart,
  'message-plus': messagePlus,
  'message-question-circle': messageQuestionCircle,
  'message-text': messageText,
  'message-x': messageX,
  'microphone-off': microphoneOff,
  microphone,
  minimize,
  modem,
  'module-box': moduleBox,
  module: module,
  money,
  monitor,
  more,
  motorcycle,
  move,
  'negotiation-block': negotiationBlock,
  negotiation,
  netflix,
  notification,
  olt,
  onu,
  option,
  'order-bottom': orderBottom,
  'order-generic': orderGeneric,
  'order-letter1': orderLetter1,
  'order-letter2': orderLetter2,
  'order-number1': orderNumber1,
  'order-number2': orderNumber2,
  'order-up': orderUp,
  out,
  passcode,
  pause,
  pencil,
  percent,
  'phone-block': phoneBlock,
  'phone-call': phoneCall,
  'phone-call2': phoneCall2,
  'phone-hang-up': phoneHangUp,
  'phone-incoming': phoneIncoming,
  'phone-outgoing': phoneOutgoing,
  'phone-outgoing1': phoneOutgoing1,
  'phone-pause': phonePause,
  'phone-refresh': phoneRefresh,
  photo,
  pin,
  pin2,
  pix,
  play,
  'plus-solid': plusSolid,
  plus,
  'presentation-chart': presentationChart,
  printer,
  process,
  qrcode,
  'question-rounded': questionRounded,
  radio,
  'receipt-check': receiptCheck,
  receipt,
  'receive-telephone': receiveTelephone,
  recording1,
  recording2,
  refresh,
  regions,
  'registration-list': registrationList,
  'remove-telephone': removeTelephone,
  'remove-user': removeUser,
  repeat,
  restore,
  right,
  right2,
  right3,
  rota,
  sale,
  sandwich,
  save,
  scan,
  'search-localization': searchLocalization,
  search,
  security,
  'semi-down': semiDown,
  'semi-up': semiUp,
  send,
  serial,
  server,
  'service-internet': serviceInternet,
  'service-phone': servicePhone,
  'service-tv': serviceTv,
  share,
  'shield-off': shieldOff,
  'shield-tick': shieldTick,
  shield,
  'shopping-cart': shoppingCart,
  simcard,
  smartphone,
  'sort-asc': sortAsc,
  'sort-desc': sortDesc,
  speedometer,
  'star-solid': starSolid,
  star,
  stb,
  stop,
  sub,
  submit,
  'tag-division': tagDivision,
  tag,
  target,
  target3,
  technical,
  telephone,
  'thumbs-down': thumbsDown,
  'thumbs-up': thumbsUp,
  ticket,
  'time-telephone': timeTelephone,
  time,
  total,
  trash,
  tv,
  trophy,
  union,
  up,
  up3,
  upload,
  'user-block': userBlock,
  'user-bottom': userBottom,
  'user-clock': userClock,
  'user-left': userLeft,
  'user-marker': userMarker,
  'user-minus': userMinus,
  'user-right': userRight,
  'user-search': userSearch,
  'user-top': userTop,
  user,
  'verification-security': verificationSecurity,
  vertical,
  'view-block': viewBlock,
  view,
  'volume-max': volumeMax,
  'volume-minus': volumeMinus,
  'volume-plus': volumePlus,
  'volume-x': volumeX,
  'wait-check': waitCheck,
  'wait-warning': waitWarning,
  wait,
  wallet,
  'watch-circle': watchCircle,
  whatsapp,
  wifi,
  'work-bag': workBag,
  working,
  'zap-off': zapOff,
  zap,
  'zoom-in': zoomIn,
  'zoom-out': zoomOut,
};
