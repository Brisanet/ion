import {
  access,
  access2,
  addSecurity,
  activeDeactivate,
  add,
  alert,
  arrowsDownUp,
  arrowsUpDown,
  auditForwarded,
  block,
  bank,
  calendar,
  calendarAttention,
  calendarMoney,
  check,
  checkSolid,
  clockSolid,
  close,
  closeSolid,
  closeRounded,
  condominium,
  config,
  config2,
  doc,
  docAdd,
  docCheck,
  docClose,
  docWarning,
  exclamation,
  exclamationSolid,
  exclamationRounded,
  expand,
  filter,
  graphic2,
  group,
  headset,
  home,
  info,
  infoSolid,
  information,
  intersection,
  left2,
  left3,
  localization,
  messageBallon,
  motorcycle,
  module,
  moduleBox,
  more,
  option,
  out,
  pencil,
  plusSolid,
  questionRounded,
  refresh,
  registrationList,
  right2,
  right3,
  rota,
  sandwich,
  search,
  semiDown,
  semiUp,
  serviceInternet,
  servicePhone,
  serviceTv,
  sortAsc,
  sortDesc,
  starSolid,
  onu,
  sub,
  technical,
  trash,
  union,
  user,
  wait,
  waitWarning,
  working,
  checkOutlined,
  arrowsLeftRight,
  download,
  upload,
  stb,
  time,
  clip,
  total,
  docGraphic,
  money,
  tagDivision,
  down3,
  list,
  alertList,
  checkList,
  addUser,
  removeUser,
  alertUser,
  checkUser,
  forwardedService,
  historic,
  left,
  down,
  up3,
  up,
  right,
  plus,
  removeTelephone,
  receiveTelephone,
  alertTelephone,
  addTelephone,
  timeTelephone,
  telephone,
  graphic,
  box,
  box2,
  box3,
  box4,
  box5,
  box6,
  star,
  orderBottom,
  orderUp,
  sale,
  netflix,
  click,
  click2,
  view,
  viewBlock,
  qrcode,
  pix,
  searchLocalization,
  homeDown,
  homeUp,
  homeUpdate,
  homeLocalization,
  clipboard,
  clipboardLocalization,
  clipboardCheck,
  calendarAdd,
  save,
  cloudDownload,
  cloudUpload,
  cloud,
  security,
  verificationSecurity,
  car,
  send,
  notification,
  workBag,
  wifi,
  horizontal,
  comeIn,
  vertical,
  comment,
  negotiation,
  camera,
  radio,
  key,
  serial,
  convenient,
  coordinate,
  coord,
  submit,
  cto,
  photo,
  barCode,
  process,
  orderLetter1,
  orderLetter2,
  hook,
  smartphone,
  olt,
  orderGeneric,
  play,
  pause,
  copy,
  graphic3,
  calendarReserved,
  percent,
  mail,
  edit2,
  link,
  linkBroken,
  divide,
  pin2,
  pin,
  share,
  speedometer,
  target,
  target3,
  zapOff,
  zap,
  heartHand,
  business,
  condominium2,
  restore,
  homeCheck,
  homeX,
  boxX,
  boxClock,
  boxBlock,
  boxSearch,
  boxMinus,
  boxPin,
  boxPlus,
  boxLeft,
  barChartSquareDown,
  barChartSquareMinus,
  barChartSquarePlus,
  barChartSquareUp,
  horizontalBarChart,
  lineChartDown,
  lineChartUp,
  presentationChart,
  messageChat,
  messageAlert,
  messageCheck,
  messageHeart,
  messagePlus,
  messageQuestionCircle,
  messageText,
  negotiationBlock,
  messageX,
  inbox,
  phoneHangUp,
  phoneIncoming,
  phoneOutgoing1,
  phoneOutgoing,
  phonePause,
  phoneCall,
  phoneCall2,
  phoneBlock,
  batteryCharging,
  recording1,
  volumeMax,
  fastBackward,
  microphone,
  recording2,
  volumeMinus,
  fastForward,
  microphoneOff,
  repeat,
  volumePlus,
  stop,
  simcard,
  volumeX,
  faceSad,
  faceFrown,
  faceNeutral,
  faceSmile,
  userMinus,
  userSearch,
  userMarker,
  userBlock,
  userClock,
  userBottom,
  userTop,
  userRight,
  userLeft,
  database,
  faceHappy,
  server,
  lightbulb,
  modem,
  printer,
  laptop,
  monitor,
  tv,
  scan,
  fileLock,
  shield,
  faceId,
  fileShield,
  passcode,
  fingerprint,
  shieldOff,
  shieldTick,
  lockUnlocked,
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
  'alert-list': alertList,
  'alert-telephone': alertTelephone,
  'alert-user': alertUser,
  alert,
  'arrows-down-up': arrowsDownUp,
  'arrows-left-right': arrowsLeftRight,
  'arrows-up-down': arrowsUpDown,
  auditForwarded,
  bank,
  'bar-chart-square-down': barChartSquareDown,
  'bar-chart-square-minus': barChartSquareMinus,
  'bar-chart-square-plus': barChartSquarePlus,
  'bar-chart-square-up': barChartSquareUp,
  'bar-code': barCode,
  'battery-charging': batteryCharging,
  block,
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
  'calendar-money': calendarMoney,
  'calendar-reserved': calendarReserved,
  calendar,
  camera,
  car,
  'check-list': checkList,
  'check-outlined': checkOutlined,
  'check-solid': checkSolid,
  'check-user': checkUser,
  check,
  click,
  click2,
  clip,
  'clipboard-check': clipboardCheck,
  'clipboard-localization': clipboardLocalization,
  clipboard,
  'clock-solid': clockSolid,
  'close-rounded': closeRounded,
  'close-solid': closeSolid,
  close,
  'cloud-download': cloudDownload,
  'cloud-upload': cloudUpload,
  cloud,
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
  cto,
  database,
  divide,
  'doc-add': docAdd,
  'doc-check': docCheck,
  'doc-close': docClose,
  'doc-graphic': docGraphic,
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
  'forwarded-service': forwardedService,
  graphic,
  graphic2,
  graphic3,
  group,
  headset,
  'heart-hand': heartHand,
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
  inbox,
  'info-solid': infoSolid,
  info,
  information,
  intersection,
  key,
  laptop,
  left,
  left2,
  left3,
  lightbulb,
  'line-chart-down': lineChartDown,
  'line-chart-up': lineChartUp,
  'link-broken': linkBroken,
  link,
  list,
  localization,
  'lock-unlocked': lockUnlocked,
  mail,
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
  modem,
  'module-box': moduleBox,
  module: module,
  money,
  monitor,
  more,
  motorcycle,
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
  'receive-telephone': receiveTelephone,
  recording1,
  recording2,
  refresh,
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
  target,
  target3,
  technical,
  telephone,
  'time-telephone': timeTelephone,
  time,
  total,
  trash,
  tv,
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
  'wait-warning': waitWarning,
  wait,
  wifi,
  'work-bag': workBag,
  working,
  'zap-off': zapOff,
  zap,
};
