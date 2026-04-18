// Grameen Drishti — District Data
// Sources: MGNREGA MIS 2023-24 | PMAY-G 2024 | PMGSY/OMMS 2024
//          JJM Dashboard 2024 | DAY-NRLM 2024 | Census 2011 | NFHS-5

export const BENCHMARKS = {
  mgnrega: 68, pmay: 72, pmgsy: 82, jjm: 59, nrlm: 84,
  fundUtil: 76, literacy: 77.7, electrification: 96, irrigation: 52,
};

export const districts = [
  // Bihar
  { id:1,  name:"Purnia",        state:"Bihar",           region:"East",    lat:25.78, lng:87.47, pop:3264619, distress:10,
    lit:51.1, sexRatio:921, elec:61, gw:9, rainDep:88, irr:12, agri:28,
    mg:{ demand:408000, pd:16400000, wage:178, pct:44, hh:566000 },
    pm:{ sanc:162000, done:61600, pct:38, rel:39.2, util:16.4 },
    pg:{ tgt:1020, conn:541, pct:53, kmS:6020, kmD:3180 },
    jj:{ hh:566000, tap:112000, pct:20, safe:55 },
    nl:{ shg:11400, mem:128000, bl:7600, blPct:67, loan:318 } },

  { id:2,  name:"Sitamarhi",     state:"Bihar",           region:"East",    lat:26.59, lng:85.49, pop:3423574, distress:10,
    lit:52.1, sexRatio:899, elec:58, gw:8, rainDep:86, irr:14, agri:30,
    mg:{ demand:428000, pd:17200000, wage:179, pct:46, hh:594000 },
    pm:{ sanc:172000, done:68800, pct:40, rel:41.2, util:18.1 },
    pg:{ tgt:1080, conn:583, pct:54, kmS:6420, kmD:3480 },
    jj:{ hh:594000, tap:130700, pct:22, safe:52 },
    nl:{ shg:12100, mem:138000, bl:8200, blPct:68, loan:348 } },

  { id:3,  name:"Darbhanga",     state:"Bihar",           region:"East",    lat:26.15, lng:85.90, pop:3937385, distress:9,
    lit:57.9, sexRatio:908, elec:64, gw:8, rainDep:84, irr:18, agri:34,
    mg:{ demand:498000, pd:19800000, wage:180, pct:48, hh:682000 },
    pm:{ sanc:198000, done:81200, pct:41, rel:48.2, util:21.8 },
    pg:{ tgt:1240, conn:694, pct:56, kmS:7480, kmD:4180 },
    jj:{ hh:682000, tap:163700, pct:24, safe:48 },
    nl:{ shg:14200, mem:162000, bl:9800, blPct:69, loan:418 } },

  { id:4,  name:"Muzaffarpur",   state:"Bihar",           region:"East",    lat:26.12, lng:85.36, pop:4801062, distress:9,
    lit:63.4, sexRatio:900, elec:68, gw:7, rainDep:82, irr:22, agri:36,
    mg:{ demand:598000, pd:23800000, wage:182, pct:46, hh:832000 },
    pm:{ sanc:238000, done:97600, pct:41, rel:58.2, util:26.8 },
    pg:{ tgt:1480, conn:799, pct:54, kmS:8980, kmD:4850 },
    jj:{ hh:832000, tap:174700, pct:21, safe:50 },
    nl:{ shg:17200, mem:194000, bl:11800, blPct:69, loan:488 } },

  { id:5,  name:"Gaya",          state:"Bihar",           region:"East",    lat:24.79, lng:85.00, pop:4391418, distress:9,
    lit:63.7, sexRatio:935, elec:71, gw:7, rainDep:80, irr:24, agri:38,
    mg:{ demand:548000, pd:21800000, wage:187, pct:47, hh:762000 },
    pm:{ sanc:218000, done:87200, pct:40, rel:53.2, util:23.9 },
    pg:{ tgt:1360, conn:721, pct:53, kmS:8180, kmD:4340 },
    jj:{ hh:762000, tap:152400, pct:20, safe:56 },
    nl:{ shg:15800, mem:178000, bl:10800, blPct:68, loan:438 } },

  { id:6,  name:"Patna",         state:"Bihar",           region:"East",    lat:25.59, lng:85.14, pop:5838465, distress:6,
    lit:70.7, sexRatio:897, elec:78, gw:6, rainDep:72, irr:42, agri:52,
    mg:{ demand:488000, pd:19400000, wage:194, pct:54, hh:688000 },
    pm:{ sanc:188000, done:98000, pct:52, rel:46.8, util:28.1 },
    pg:{ tgt:1180, conn:694, pct:59, kmS:7180, kmD:4237 },
    jj:{ hh:688000, tap:213300, pct:31, safe:58 },
    nl:{ shg:13600, mem:154000, bl:10200, blPct:75, loan:448 } },

  // Rajasthan
  { id:7,  name:"Barmer",        state:"Rajasthan",       region:"North",   lat:25.75, lng:71.40, pop:2603751, distress:9,
    lit:56.5, sexRatio:902, elec:81, gw:9, rainDep:92, irr:8, agri:24,
    mg:{ demand:312000, pd:14200000, wage:198, pct:54, hh:428000 },
    pm:{ sanc:118000, done:57800, pct:49, rel:30.2, util:17.8 },
    pg:{ tgt:840, conn:513, pct:61, kmS:6820, kmD:4160 },
    jj:{ hh:428000, tap:111300, pct:26, safe:38 },
    nl:{ shg:9200, mem:104000, bl:6800, blPct:74, loan:312 } },

  { id:8,  name:"Jaisalmer",     state:"Rajasthan",       region:"North",   lat:26.92, lng:70.91, pop:669919,  distress:9,
    lit:57.1, sexRatio:852, elec:79, gw:9, rainDep:94, irr:6, agri:20,
    mg:{ demand:72100, pd:3180000, wage:196, pct:52, hh:108000 },
    pm:{ sanc:28400, done:12800, pct:45, rel:7.2, util:3.8 },
    pg:{ tgt:210, conn:118, pct:56, kmS:1820, kmD:1021 },
    jj:{ hh:108000, tap:29200, pct:27, safe:35 },
    nl:{ shg:2100, mem:23800, bl:1480, blPct:70, loan:68 } },

  { id:9,  name:"Nagaur",        state:"Rajasthan",       region:"North",   lat:27.20, lng:73.73, pop:3307743, distress:7,
    lit:62.8, sexRatio:929, elec:87, gw:8, rainDep:82, irr:18, agri:32,
    mg:{ demand:382000, pd:15800000, wage:203, pct:57, hh:548000 },
    pm:{ sanc:148000, done:78400, pct:53, rel:37.2, util:21.2 },
    pg:{ tgt:1020, conn:612, pct:60, kmS:6820, kmD:4090 },
    jj:{ hh:548000, tap:159000, pct:29, safe:42 },
    nl:{ shg:12400, mem:140000, bl:9200, blPct:74, loan:388 } },

  { id:10, name:"Udaipur",       state:"Rajasthan",       region:"North",   lat:24.59, lng:73.71, pop:3067549, distress:6,
    lit:61.8, sexRatio:960, elec:91, gw:6, rainDep:74, irr:26, agri:36,
    mg:{ demand:348000, pd:14200000, wage:213, pct:59, hh:508000 },
    pm:{ sanc:138000, done:74500, pct:54, rel:35.2, util:21.1 },
    pg:{ tgt:960, conn:586, pct:61, kmS:6420, kmD:3920 },
    jj:{ hh:508000, tap:157500, pct:31, safe:48 },
    nl:{ shg:11600, mem:130000, bl:8800, blPct:76, loan:368 } },

  { id:11, name:"Jaipur",        state:"Rajasthan",       region:"North",   lat:26.91, lng:75.79, pop:6663971, distress:4,
    lit:76.4, sexRatio:910, elec:94, gw:7, rainDep:68, irr:34, agri:48,
    mg:{ demand:348000, pd:14600000, wage:218, pct:65, hh:518000 },
    pm:{ sanc:138000, done:91000, pct:66, rel:36.8, util:25.8 },
    pg:{ tgt:980, conn:696, pct:71, kmS:6680, kmD:4743 },
    jj:{ hh:518000, tap:192700, pct:37, safe:58 },
    nl:{ shg:11800, mem:133000, bl:9440, blPct:80, loan:428 } },

  // Madhya Pradesh
  { id:12, name:"Shivpuri",      state:"Madhya Pradesh",  region:"Central", lat:25.44, lng:77.66, pop:1726048, distress:8,
    lit:63.7, sexRatio:882, elec:81, gw:6, rainDep:76, irr:28, agri:38,
    mg:{ demand:189200, pd:8940000, wage:196, pct:58, hh:318000 },
    pm:{ sanc:84100, done:47300, pct:56, rel:21.8, util:13.9 },
    pg:{ tgt:620, conn:415, pct:67, kmS:4120, kmD:2760 },
    jj:{ hh:318000, tap:101800, pct:32, safe:55 },
    nl:{ shg:7840, mem:88200, bl:6100, blPct:78, loan:298 } },

  { id:13, name:"Rewa",          state:"Madhya Pradesh",  region:"Central", lat:24.54, lng:81.30, pop:2365106, distress:7,
    lit:71.4, sexRatio:934, elec:86, gw:5, rainDep:68, irr:32, agri:42,
    mg:{ demand:268000, pd:11200000, wage:204, pct:58, hh:398000 },
    pm:{ sanc:112000, done:61600, pct:55, rel:28.8, util:17.2 },
    pg:{ tgt:740, conn:444, pct:60, kmS:4920, kmD:2950 },
    jj:{ hh:398000, tap:119400, pct:30, safe:60 },
    nl:{ shg:9400, mem:106000, bl:7000, blPct:74, loan:298 } },

  { id:14, name:"Indore",        state:"Madhya Pradesh",  region:"Central", lat:22.72, lng:75.86, pop:3276697, distress:3,
    lit:87.4, sexRatio:924, elec:96, gw:5, rainDep:54, irr:52, agri:64,
    mg:{ demand:148000, pd:7200000, wage:224, pct:74, hh:218000 },
    pm:{ sanc:58000, done:45500, pct:78, rel:15.8, util:13.0 },
    pg:{ tgt:420, conn:353, pct:84, kmS:2940, kmD:2469 },
    jj:{ hh:218000, tap:153000, pct:70, safe:82 },
    nl:{ shg:6200, mem:70000, bl:5700, blPct:92, loan:278 } },

  // Jharkhand
  { id:15, name:"Dumka",         state:"Jharkhand",       region:"East",    lat:24.27, lng:87.25, pop:1321442, distress:8,
    lit:62.4, sexRatio:991, elec:69, gw:4, rainDep:76, irr:16, agri:30,
    mg:{ demand:154000, pd:6820000, wage:186, pct:52, hh:240000 },
    pm:{ sanc:68000, done:32600, pct:48, rel:16.8, util:8.9 },
    pg:{ tgt:480, conn:274, pct:57, kmS:3180, kmD:1812 },
    jj:{ hh:240000, tap:57600, pct:24, safe:68 },
    nl:{ shg:5800, mem:66000, bl:4200, blPct:72, loan:178 } },

  { id:16, name:"Ranchi",        state:"Jharkhand",       region:"East",    lat:23.34, lng:85.31, pop:2914253, distress:6,
    lit:76.1, sexRatio:949, elec:82, gw:4, rainDep:70, irr:22, agri:40,
    mg:{ demand:308000, pd:12800000, wage:196, pct:56, hh:482000 },
    pm:{ sanc:138000, done:71900, pct:52, rel:34.2, util:19.8 },
    pg:{ tgt:920, conn:543, pct:59, kmS:5820, kmD:3434 },
    jj:{ hh:482000, tap:130100, pct:27, safe:72 },
    nl:{ shg:11800, mem:134000, bl:8800, blPct:75, loan:368 } },

  // Odisha
  { id:17, name:"Koraput",       state:"Odisha",          region:"East",    lat:18.81, lng:82.71, pop:1376934, distress:8,
    lit:50.4, sexRatio:1035, elec:68, gw:3, rainDep:68, irr:18, agri:34,
    mg:{ demand:162000, pd:7480000, wage:191, pct:56, hh:248000 },
    pm:{ sanc:72000, done:36700, pct:51, rel:18.2, util:10.2 },
    pg:{ tgt:520, conn:298, pct:57, kmS:3420, kmD:1949 },
    jj:{ hh:248000, tap:62000, pct:25, safe:74 },
    nl:{ shg:6200, mem:70800, bl:4800, blPct:77, loan:198 } },

  { id:18, name:"Mayurbhanj",    state:"Odisha",          region:"East",    lat:21.94, lng:86.73, pop:2513895, distress:7,
    lit:63.9, sexRatio:1008, elec:71, gw:4, rainDep:72, irr:20, agri:38,
    mg:{ demand:298000, pd:13200000, wage:196, pct:58, hh:432000 },
    pm:{ sanc:128000, done:67800, pct:53, rel:31.8, util:18.2 },
    pg:{ tgt:880, conn:510, pct:58, kmS:5680, kmD:3294 },
    jj:{ hh:432000, tap:116600, pct:27, safe:70 },
    nl:{ shg:10800, mem:122000, bl:8200, blPct:76, loan:348 } },

  { id:19, name:"Ganjam",        state:"Odisha",          region:"East",    lat:19.39, lng:84.69, pop:3520151, distress:5,
    lit:70.9, sexRatio:1008, elec:84, gw:5, rainDep:62, irr:36, agri:50,
    mg:{ demand:328000, pd:13800000, wage:204, pct:62, hh:482000 },
    pm:{ sanc:138000, done:84200, pct:61, rel:35.8, util:22.9 },
    pg:{ tgt:980, conn:618, pct:63, kmS:6580, kmD:4145 },
    jj:{ hh:482000, tap:164900, pct:34, safe:68 },
    nl:{ shg:13200, mem:148000, bl:10200, blPct:77, loan:418 } },

  // Chhattisgarh
  { id:20, name:"Bastar",        state:"Chhattisgarh",    region:"Central", lat:19.10, lng:82.03, pop:1411644, distress:7,
    lit:58.1, sexRatio:1023, elec:68, gw:3, rainDep:62, irr:16, agri:32,
    mg:{ demand:168000, pd:7820000, wage:188, pct:54, hh:256000 },
    pm:{ sanc:74000, done:38200, pct:52, rel:18.8, util:10.6 },
    pg:{ tgt:540, conn:319, pct:59, kmS:3620, kmD:2136 },
    jj:{ hh:256000, tap:69100, pct:27, safe:76 },
    nl:{ shg:6400, mem:72800, bl:5000, blPct:78, loan:208 } },

  { id:21, name:"Sukma",         state:"Chhattisgarh",    region:"Central", lat:18.39, lng:81.66, pop:249000,  distress:9,
    lit:47.2, sexRatio:1021, elec:64, gw:3, rainDep:58, irr:10, agri:24,
    mg:{ demand:29000, pd:1280000, wage:183, pct:47, hh:44000 },
    pm:{ sanc:13000, done:5200, pct:40, rel:3.2, util:1.4 },
    pg:{ tgt:94, conn:48, pct:51, kmS:630, kmD:321 },
    jj:{ hh:44000, tap:9700, pct:22, safe:76 },
    nl:{ shg:1100, mem:12500, bl:740, blPct:67, loan:32 } },

  { id:22, name:"Raipur",        state:"Chhattisgarh",    region:"Central", lat:21.25, lng:81.63, pop:4063872, distress:4,
    lit:76.4, sexRatio:989, elec:87, gw:4, rainDep:64, irr:32, agri:50,
    mg:{ demand:298000, pd:13200000, wage:201, pct:65, hh:448000 },
    pm:{ sanc:148000, done:102900, pct:70, rel:39.4, util:29.5 },
    pg:{ tgt:820, conn:591, pct:72, kmS:5580, kmD:4018 },
    jj:{ hh:448000, tap:188200, pct:42, safe:72 },
    nl:{ shg:10800, mem:122000, bl:9100, blPct:84, loan:388 } },

  // Uttar Pradesh
  { id:23, name:"Shrawasti",     state:"Uttar Pradesh",   region:"North",   lat:27.36, lng:81.80, pop:1117361, distress:9,
    lit:46.7, sexRatio:978, elec:61, gw:5, rainDep:80, irr:30, agri:38,
    mg:{ demand:134000, pd:5620000, wage:190, pct:48, hh:196000 },
    pm:{ sanc:56000, done:22400, pct:40, rel:14.0, util:6.2 },
    pg:{ tgt:340, conn:177, pct:52, kmS:2280, kmD:1186 },
    jj:{ hh:196000, tap:43100, pct:22, safe:58 },
    nl:{ shg:4200, mem:47600, bl:2940, blPct:70, loan:128 } },

  { id:24, name:"Bahraich",      state:"Uttar Pradesh",   region:"North",   lat:27.57, lng:81.60, pop:3487731, distress:9,
    lit:49.3, sexRatio:947, elec:63, gw:5, rainDep:78, irr:32, agri:40,
    mg:{ demand:418000, pd:17600000, wage:191, pct:48, hh:610000 },
    pm:{ sanc:174000, done:69600, pct:40, rel:43.6, util:19.2 },
    pg:{ tgt:1060, conn:551, pct:52, kmS:7100, kmD:3692 },
    jj:{ hh:610000, tap:134200, pct:22, safe:60 },
    nl:{ shg:13100, mem:148000, bl:9200, blPct:70, loan:388 } },

  { id:25, name:"Varanasi",      state:"Uttar Pradesh",   region:"North",   lat:25.32, lng:82.97, pop:3676841, distress:5,
    lit:77.0, sexRatio:883, elec:85, gw:5, rainDep:72, irr:48, agri:54,
    mg:{ demand:298000, pd:12800000, wage:196, pct:58, hh:482000 },
    pm:{ sanc:128000, done:75000, pct:59, rel:33.6, util:21.8 },
    pg:{ tgt:780, conn:491, pct:63, kmS:5240, kmD:3301 },
    jj:{ hh:482000, tap:198400, pct:41, safe:62 },
    nl:{ shg:11000, mem:124000, bl:9100, blPct:83, loan:368 } },

  { id:26, name:"Lucknow",       state:"Uttar Pradesh",   region:"North",   lat:26.85, lng:80.95, pop:4589838, distress:3,
    lit:77.3, sexRatio:906, elec:88, gw:6, rainDep:68, irr:52, agri:62,
    mg:{ demand:218000, pd:10400000, wage:204, pct:68, hh:298000 },
    pm:{ sanc:88000, done:64200, pct:73, rel:24.2, util:18.4 },
    pg:{ tgt:520, conn:426, pct:82, kmS:3620, kmD:2968 },
    jj:{ hh:298000, tap:179400, pct:60, safe:72 },
    nl:{ shg:8200, mem:92800, bl:7620, blPct:93, loan:328 } },

  // Andhra Pradesh
  { id:27, name:"Anantapur",     state:"Andhra Pradesh",  region:"South",   lat:14.68, lng:77.60, pop:4083315, distress:6,
    lit:62.3, sexRatio:977, elec:91, gw:8, rainDep:82, irr:28, agri:40,
    mg:{ demand:428000, pd:18200000, wage:236, pct:68, hh:682000 },
    pm:{ sanc:168000, done:107500, pct:64, rel:43.2, util:30.2 },
    pg:{ tgt:1180, conn:815, pct:69, kmS:7480, kmD:5161 },
    jj:{ hh:682000, tap:245500, pct:36, safe:52 },
    nl:{ shg:16200, mem:184000, bl:13200, blPct:81, loan:568 } },

  { id:28, name:"Kurnool",       state:"Andhra Pradesh",  region:"South",   lat:15.83, lng:78.04, pop:4046601, distress:5,
    lit:60.2, sexRatio:984, elec:93, gw:7, rainDep:78, irr:42, agri:46,
    mg:{ demand:418000, pd:17800000, wage:241, pct:71, hh:672000 },
    pm:{ sanc:162000, done:108500, pct:67, rel:41.8, util:30.1 },
    pg:{ tgt:1160, conn:824, pct:71, kmS:7280, kmD:5169 },
    jj:{ hh:672000, tap:255400, pct:38, safe:55 },
    nl:{ shg:15800, mem:178000, bl:12800, blPct:81, loan:548 } },

  { id:29, name:"Krishna",       state:"Andhra Pradesh",  region:"South",   lat:16.61, lng:80.65, pop:4529009, distress:3,
    lit:74.2, sexRatio:993, elec:97, gw:4, rainDep:52, irr:62, agri:72,
    mg:{ demand:288000, pd:12400000, wage:251, pct:74, hh:468000 },
    pm:{ sanc:128000, done:93000, pct:73, rel:34.4, util:26.5 },
    pg:{ tgt:880, conn:686, pct:78, kmS:5960, kmD:4649 },
    jj:{ hh:468000, tap:218500, pct:47, safe:72 },
    nl:{ shg:10800, mem:122000, bl:9180, blPct:85, loan:428 } },

  // Telangana
  { id:30, name:"Mahbubnagar",   state:"Telangana",       region:"South",   lat:16.75, lng:77.99, pop:1871907, distress:6,
    lit:56.1, sexRatio:1003, elec:87, gw:7, rainDep:74, irr:38, agri:44,
    mg:{ demand:192000, pd:8120000, wage:221, pct:62, hh:312000 },
    pm:{ sanc:78000, done:48400, pct:62, rel:20.2, util:13.7 },
    pg:{ tgt:580, conn:394, pct:68, kmS:3820, kmD:2598 },
    jj:{ hh:312000, tap:96700, pct:31, safe:58 },
    nl:{ shg:7400, mem:84000, bl:5800, blPct:78, loan:248 } },

  // Karnataka
  { id:31, name:"Raichur",       state:"Karnataka",       region:"South",   lat:16.21, lng:77.35, pop:1924773, distress:6,
    lit:57.2, sexRatio:976, elec:88, gw:7, rainDep:72, irr:52, agri:50,
    mg:{ demand:198000, pd:8420000, wage:228, pct:63, hh:322000 },
    pm:{ sanc:82000, done:50800, pct:62, rel:21.2, util:14.2 },
    pg:{ tgt:620, conn:422, pct:68, kmS:4120, kmD:2802 },
    jj:{ hh:322000, tap:109500, pct:34, safe:60 },
    nl:{ shg:7600, mem:86000, bl:6000, blPct:79, loan:258 } },

  { id:32, name:"Yadgir",        state:"Karnataka",       region:"South",   lat:16.77, lng:77.14, pop:1172985, distress:7,
    lit:48.8, sexRatio:975, elec:85, gw:7, rainDep:76, irr:36, agri:40,
    mg:{ demand:128000, pd:5420000, wage:224, pct:60, hh:208000 },
    pm:{ sanc:52000, done:30200, pct:58, rel:13.4, util:8.4 },
    pg:{ tgt:380, conn:242, pct:64, kmS:2580, kmD:1651 },
    jj:{ hh:208000, tap:66600, pct:32, safe:58 },
    nl:{ shg:4800, mem:54400, bl:3790, blPct:79, loan:158 } },

  { id:33, name:"Mysuru",        state:"Karnataka",       region:"South",   lat:12.30, lng:76.64, pop:3001127, distress:3,
    lit:76.5, sexRatio:982, elec:98, gw:3, rainDep:42, irr:58, agri:70,
    mg:{ demand:148000, pd:7420000, wage:261, pct:76, hh:218000 },
    pm:{ sanc:58000, done:43500, pct:75, rel:16.0, util:12.8 },
    pg:{ tgt:420, conn:361, pct:86, kmS:2980, kmD:2563 },
    jj:{ hh:218000, tap:163500, pct:75, safe:85 },
    nl:{ shg:5600, mem:63400, bl:5100, blPct:91, loan:228 } },

  // Maharashtra
  { id:34, name:"Wardha",        state:"Maharashtra",     region:"West",    lat:20.75, lng:78.60, pop:1300774, distress:5,
    lit:81.4, sexRatio:956, elec:94, gw:6, rainDep:73, irr:44, agri:52,
    mg:{ demand:128000, pd:5420000, wage:231, pct:67, hh:218000 },
    pm:{ sanc:52000, done:34800, pct:67, rel:13.8, util:10.2 },
    pg:{ tgt:380, conn:278, pct:73, kmS:2480, kmD:1810 },
    jj:{ hh:218000, tap:78500, pct:36, safe:65 },
    nl:{ shg:5200, mem:59200, bl:4200, blPct:81, loan:188 } },

  { id:35, name:"Yavatmal",      state:"Maharashtra",     region:"West",    lat:20.39, lng:78.12, pop:2772348, distress:6,
    lit:77.3, sexRatio:946, elec:88, gw:6, rainDep:78, irr:34, agri:44,
    mg:{ demand:268000, pd:10800000, wage:218, pct:62, hh:448000 },
    pm:{ sanc:108000, done:64800, pct:60, rel:27.2, util:18.1 },
    pg:{ tgt:780, conn:546, pct:70, kmS:4880, kmD:3416 },
    jj:{ hh:448000, tap:125440, pct:28, safe:62 },
    nl:{ shg:10400, mem:118000, bl:8200, blPct:79, loan:338 } },

  { id:36, name:"Nashik",        state:"Maharashtra",     region:"West",    lat:20.01, lng:73.79, pop:6107187, distress:4,
    lit:80.0, sexRatio:943, elec:96, gw:5, rainDep:62, irr:52, agri:60,
    mg:{ demand:428000, pd:17800000, wage:245, pct:74, hh:682000 },
    pm:{ sanc:168000, done:117600, pct:70, rel:44.2, util:32.7 },
    pg:{ tgt:1280, conn:947, pct:74, kmS:8120, kmD:6009 },
    jj:{ hh:682000, tap:299100, pct:44, safe:72 },
    nl:{ shg:16400, mem:186000, bl:13800, blPct:84, loan:588 } },

  // Gujarat
  { id:37, name:"Kutch",         state:"Gujarat",         region:"West",    lat:23.73, lng:69.86, pop:2092371, distress:5,
    lit:70.6, sexRatio:908, elec:92, gw:8, rainDep:78, irr:32, agri:42,
    mg:{ demand:168000, pd:7200000, wage:218, pct:62, hh:248000 },
    pm:{ sanc:68000, done:44200, pct:65, rel:18.2, util:12.7 },
    pg:{ tgt:480, conn:326, pct:68, kmS:3280, kmD:2230 },
    jj:{ hh:248000, tap:113700, pct:46, safe:48 },
    nl:{ shg:5800, mem:66000, bl:5000, blPct:86, loan:218 } },

  { id:38, name:"Dahod",         state:"Gujarat",         region:"West",    lat:22.83, lng:74.25, pop:2127086, distress:6,
    lit:65.0, sexRatio:989, elec:88, gw:5, rainDep:68, irr:28, agri:44,
    mg:{ demand:198000, pd:8640000, wage:212, pct:60, hh:308000 },
    pm:{ sanc:82000, done:49200, pct:60, rel:21.8, util:14.2 },
    pg:{ tgt:560, conn:370, pct:66, kmS:3820, kmD:2521 },
    jj:{ hh:308000, tap:116000, pct:38, safe:65 },
    nl:{ shg:7000, mem:79400, bl:5800, blPct:83, loan:248 } },

  { id:39, name:"Anand",         state:"Gujarat",         region:"West",    lat:22.56, lng:72.93, pop:2090276, distress:2,
    lit:85.6, sexRatio:950, elec:98, gw:4, rainDep:44, irr:62, agri:72,
    mg:{ demand:68000, pd:3600000, wage:237, pct:82, hh:88000 },
    pm:{ sanc:28000, done:24400, pct:87, rel:7.8, util:7.0 },
    pg:{ tgt:240, conn:226, pct:94, kmS:1680, kmD:1579 },
    jj:{ hh:88000, tap:76100, pct:86, safe:88 },
    nl:{ shg:3200, mem:36200, bl:3040, blPct:95, loan:148 } },

  // Punjab
  { id:40, name:"Ludhiana",      state:"Punjab",          region:"North",   lat:30.90, lng:75.86, pop:3498739, distress:2,
    lit:82.7, sexRatio:874, elec:99, gw:7, rainDep:28, irr:82, agri:86,
    mg:{ demand:128000, pd:6820000, wage:291, pct:82, hh:248000 },
    pm:{ sanc:38000, done:32800, pct:86, rel:10.2, util:9.2 },
    pg:{ tgt:420, conn:407, pct:97, kmS:2820, kmD:2735 },
    jj:{ hh:248000, tap:218200, pct:88, safe:80 },
    nl:{ shg:4800, mem:54000, bl:4560, blPct:95, loan:228 } },

  { id:41, name:"Amritsar",      state:"Punjab",          region:"North",   lat:31.63, lng:74.87, pop:2490656, distress:2,
    lit:78.0, sexRatio:889, elec:98, gw:7, rainDep:31, irr:80, agri:84,
    mg:{ demand:98000, pd:5180000, wage:287, pct:81, hh:178000 },
    pm:{ sanc:28000, done:24100, pct:86, rel:7.6, util:6.8 },
    pg:{ tgt:320, conn:310, pct:97, kmS:2160, kmD:2095 },
    jj:{ hh:178000, tap:156600, pct:88, safe:78 },
    nl:{ shg:3400, mem:38600, bl:3230, blPct:95, loan:168 } },

  // Haryana
  { id:42, name:"Mewat",         state:"Haryana",         region:"North",   lat:27.98, lng:77.01, pop:1089406, distress:6,
    lit:56.1, sexRatio:907, elec:89, gw:7, rainDep:72, irr:54, agri:56,
    mg:{ demand:108000, pd:4620000, wage:252, pct:59, hh:178000 },
    pm:{ sanc:44000, done:25600, pct:58, rel:11.8, util:7.4 },
    pg:{ tgt:320, conn:195, pct:61, kmS:2180, kmD:1330 },
    jj:{ hh:178000, tap:62300, pct:35, safe:62 },
    nl:{ shg:4100, mem:46400, bl:3320, blPct:81, loan:148 } },

  // Kerala (best performers)
  { id:43, name:"Ernakulam",     state:"Kerala",          region:"South",   lat:9.93, lng:76.27, pop:3282388,  distress:1,
    lit:95.9, sexRatio:1027, elec:100, gw:2, rainDep:31, irr:62, agri:70,
    mg:{ demand:48000, pd:2820000, wage:318, pct:94, hh:82000 },
    pm:{ sanc:12000, done:11400, pct:95, rel:3.3, util:3.2 },
    pg:{ tgt:180, conn:180, pct:100, kmS:1020, kmD:1020 },
    jj:{ hh:82000, tap:79500, pct:97, safe:95 },
    nl:{ shg:3200, mem:36000, bl:3168, blPct:99, loan:168 } },

  { id:44, name:"Thiruvananthapuram", state:"Kerala",     region:"South",   lat:8.52, lng:76.94, pop:3301427,  distress:1,
    lit:93.0, sexRatio:1085, elec:100, gw:2, rainDep:35, irr:58, agri:66,
    mg:{ demand:52000, pd:2980000, wage:311, pct:92, hh:88000 },
    pm:{ sanc:14000, done:13300, pct:95, rel:3.8, util:3.6 },
    pg:{ tgt:192, conn:192, pct:100, kmS:1080, kmD:1080 },
    jj:{ hh:88000, tap:84500, pct:96, safe:94 },
    nl:{ shg:3480, mem:39200, bl:3445, blPct:99, loan:182 } },

  { id:45, name:"Palakkad",      state:"Kerala",          region:"South",   lat:10.79, lng:76.65, pop:2809934, distress:1,
    lit:89.3, sexRatio:1059, elec:99, gw:2, rainDep:33, irr:66, agri:72,
    mg:{ demand:98000, pd:5420000, wage:302, pct:88, hh:168000 },
    pm:{ sanc:28000, done:26000, pct:93, rel:7.6, util:7.3 },
    pg:{ tgt:280, conn:277, pct:99, kmS:1820, kmD:1802 },
    jj:{ hh:168000, tap:158200, pct:94, safe:93 },
    nl:{ shg:6200, mem:70000, bl:6138, blPct:99, loan:328 } },

  // Tamil Nadu
  { id:46, name:"Dharmapuri",    state:"Tamil Nadu",      region:"South",   lat:12.13, lng:78.16, pop:1506843, distress:5,
    lit:76.8, sexRatio:952, elec:96, gw:6, rainDep:58, irr:46, agri:56,
    mg:{ demand:148000, pd:6480000, wage:254, pct:64, hh:234000 },
    pm:{ sanc:58000, done:37700, pct:65, rel:15.8, util:11.0 },
    pg:{ tgt:420, conn:286, pct:68, kmS:2880, kmD:1958 },
    jj:{ hh:234000, tap:89900, pct:38, safe:72 },
    nl:{ shg:5600, mem:63400, bl:4760, blPct:85, loan:218 } },

  { id:47, name:"Madurai",       state:"Tamil Nadu",      region:"South",   lat:9.93, lng:78.12, pop:3038252,  distress:3,
    lit:84.4, sexRatio:987, elec:98, gw:5, rainDep:48, irr:54, agri:66,
    mg:{ demand:198000, pd:8620000, wage:264, pct:72, hh:318000 },
    pm:{ sanc:78000, done:58500, pct:75, rel:21.8, util:17.4 },
    pg:{ tgt:580, conn:464, pct:80, kmS:3980, kmD:3184 },
    jj:{ hh:318000, tap:162200, pct:51, safe:80 },
    nl:{ shg:7400, mem:83800, bl:6660, blPct:90, loan:298 } },

  // West Bengal
  { id:48, name:"Murshidabad",   state:"West Bengal",     region:"East",    lat:24.18, lng:88.27, pop:7103807, distress:7,
    lit:66.6, sexRatio:958, elec:78, gw:6, rainDep:74, irr:52, agri:52,
    mg:{ demand:698000, pd:28800000, wage:196, pct:54, hh:1040000 },
    pm:{ sanc:278000, done:144600, pct:52, rel:71.0, util:39.8 },
    pg:{ tgt:1820, conn:1020, pct:56, kmS:11000, kmD:6160 },
    jj:{ hh:1040000, tap:281800, pct:27, safe:52 },
    nl:{ shg:26600, mem:300000, bl:18700, blPct:70, loan:848 } },

  { id:49, name:"Purulia",       state:"West Bengal",     region:"East",    lat:23.33, lng:86.36, pop:2930115, distress:7,
    lit:65.4, sexRatio:955, elec:74, gw:4, rainDep:68, irr:22, agri:40,
    mg:{ demand:298000, pd:12800000, wage:193, pct:55, hh:448000 },
    pm:{ sanc:118000, done:60200, pct:51, rel:30.2, util:16.0 },
    pg:{ tgt:760, conn:426, pct:56, kmS:4620, kmD:2587 },
    jj:{ hh:448000, tap:116500, pct:26, safe:65 },
    nl:{ shg:11200, mem:126000, bl:7840, blPct:70, loan:348 } },

  { id:50, name:"Bardhaman",     state:"West Bengal",     region:"East",    lat:23.25, lng:87.86, pop:7717563, distress:4,
    lit:77.2, sexRatio:947, elec:88, gw:5, rainDep:68, irr:62, agri:66,
    mg:{ demand:598000, pd:26200000, wage:207, pct:62, hh:882000 },
    pm:{ sanc:238000, done:152300, pct:64, rel:62.8, util:42.7 },
    pg:{ tgt:1560, conn:1013, pct:65, kmS:9460, kmD:6149 },
    jj:{ hh:882000, tap:299900, pct:34, safe:62 },
    nl:{ shg:22700, mem:256000, bl:16390, blPct:72, loan:728 } },

  // Assam
  { id:51, name:"Barpeta",       state:"Assam",           region:"Northeast", lat:26.32, lng:91.00, pop:1693622, distress:8,
    lit:61.4, sexRatio:956, elec:73, gw:5, rainDep:72, irr:18, agri:36,
    mg:{ demand:188000, pd:7820000, wage:191, pct:50, hh:292000 },
    pm:{ sanc:74000, done:33300, pct:45, rel:18.8, util:9.0 },
    pg:{ tgt:520, conn:280, pct:54, kmS:3480, kmD:1879 },
    jj:{ hh:292000, tap:72400, pct:25, safe:58 },
    nl:{ shg:7100, mem:80300, bl:5040, blPct:71, loan:228 } },

  { id:52, name:"Nagaon",        state:"Assam",           region:"Northeast", lat:26.35, lng:92.69, pop:2856616, distress:7,
    lit:68.1, sexRatio:963, elec:76, gw:5, rainDep:68, irr:20, agri:40,
    mg:{ demand:298000, pd:12200000, wage:194, pct:51, hh:468000 },
    pm:{ sanc:118000, done:53100, pct:45, rel:29.8, util:14.3 },
    pg:{ tgt:820, conn:443, pct:54, kmS:5540, kmD:2991 },
    jj:{ hh:468000, tap:116100, pct:25, safe:60 },
    nl:{ shg:11300, mem:128000, bl:8030, blPct:71, loan:358 } },

  // Himachal Pradesh
  { id:53, name:"Shimla",        state:"Himachal Pradesh", region:"North",   lat:31.10, lng:77.17, pop:814010,  distress:2,
    lit:84.6, sexRatio:916, elec:98, gw:2, rainDep:48, irr:32, agri:60,
    mg:{ demand:68000, pd:3820000, wage:261, pct:82, hh:108000 },
    pm:{ sanc:22000, done:19800, pct:90, rel:6.1, util:5.7 },
    pg:{ tgt:280, conn:256, pct:91, kmS:1960, kmD:1783 },
    jj:{ hh:108000, tap:100400, pct:93, safe:92 },
    nl:{ shg:2400, mem:27200, bl:2280, blPct:95, loan:118 } },

  { id:54, name:"Kangra",        state:"Himachal Pradesh", region:"North",   lat:32.10, lng:76.27, pop:1510075, distress:2,
    lit:85.7, sexRatio:1013, elec:98, gw:2, rainDep:44, irr:28, agri:56,
    mg:{ demand:98000, pd:5580000, wage:258, pct:82, hh:158000 },
    pm:{ sanc:38000, done:35300, pct:93, rel:10.6, util:10.0 },
    pg:{ tgt:480, conn:446, pct:93, kmS:3360, kmD:3125 },
    jj:{ hh:158000, tap:148500, pct:94, safe:94 },
    nl:{ shg:4200, mem:47500, bl:4200, blPct:100, loan:218 } },

  // Uttarakhand
  { id:55, name:"Dehradun",      state:"Uttarakhand",     region:"North",   lat:30.32, lng:78.03, pop:1696694, distress:2,
    lit:85.2, sexRatio:902, elec:96, gw:3, rainDep:52, irr:36, agri:56,
    mg:{ demand:98000, pd:5420000, wage:248, pct:76, hh:148000 },
    pm:{ sanc:32000, done:28200, pct:88, rel:8.9, util:8.1 },
    pg:{ tgt:340, conn:312, pct:92, kmS:2380, kmD:2190 },
    jj:{ hh:148000, tap:131700, pct:89, safe:90 },
    nl:{ shg:3400, mem:38500, bl:3230, blPct:95, loan:158 } },

  // J&K
  { id:56, name:"Anantnag",      state:"Jammu & Kashmir", region:"North",   lat:33.73, lng:75.15, pop:1078692, distress:5,
    lit:58.8, sexRatio:915, elec:82, gw:2, rainDep:44, irr:32, agri:50,
    mg:{ demand:98000, pd:4180000, wage:154, pct:52, hh:168000 },
    pm:{ sanc:38000, done:19800, pct:52, rel:9.8, util:5.5 },
    pg:{ tgt:320, conn:189, pct:59, kmS:2180, kmD:1286 },
    jj:{ hh:168000, tap:88200, pct:52, safe:88 },
    nl:{ shg:3800, mem:43100, bl:3040, blPct:80, loan:148 } },

  // Manipur / Northeast
  { id:57, name:"Imphal West",   state:"Manipur",         region:"Northeast", lat:24.82, lng:93.94, pop:517992, distress:6,
    lit:80.4, sexRatio:1020, elec:81, gw:4, rainDep:62, irr:26, agri:42,
    mg:{ demand:52000, pd:2280000, wage:204, pct:54, hh:88000 },
    pm:{ sanc:22000, done:11400, pct:52, rel:5.6, util:3.2 },
    pg:{ tgt:164, conn:95, pct:58, kmS:1100, kmD:638 },
    jj:{ hh:88000, tap:28200, pct:32, safe:70 },
    nl:{ shg:2400, mem:27200, bl:1920, blPct:80, loan:88 } },

  // Meghalaya
  { id:58, name:"East Khasi Hills", state:"Meghalaya",    region:"Northeast", lat:25.58, lng:91.89, pop:825922, distress:5,
    lit:85.0, sexRatio:1007, elec:84, gw:2, rainDep:56, irr:12, agri:36,
    mg:{ demand:78000, pd:3280000, wage:218, pct:57, hh:128000 },
    pm:{ sanc:32000, done:16000, pct:50, rel:8.2, util:4.6 },
    pg:{ tgt:240, conn:138, pct:58, kmS:1620, kmD:940 },
    jj:{ hh:128000, tap:56300, pct:44, safe:80 },
    nl:{ shg:3000, mem:34000, bl:2310, blPct:77, loan:108 } },

  // Mizoram
  { id:59, name:"Aizawl",        state:"Mizoram",         region:"Northeast", lat:23.73, lng:92.72, pop:400309, distress:3,
    lit:98.5, sexRatio:976, elec:88, gw:2, rainDep:52, irr:16, agri:40,
    mg:{ demand:38000, pd:1680000, wage:218, pct:63, hh:62000 },
    pm:{ sanc:14000, done:9100, pct:65, rel:3.6, util:2.4 },
    pg:{ tgt:120, conn:72, pct:60, kmS:820, kmD:492 },
    jj:{ hh:62000, tap:44600, pct:72, safe:88 },
    nl:{ shg:1400, mem:15800, bl:1260, blPct:90, loan:62 } },

  // Vidarbha (famous cotton belt)
  { id:60, name:"Amravati",      state:"Maharashtra",     region:"West",    lat:20.93, lng:77.75, pop:2888445, distress:5,
    lit:84.2, sexRatio:949, elec:91, gw:6, rainDep:70, irr:40, agri:50,
    mg:{ demand:288000, pd:11800000, wage:224, pct:64, hh:478000 },
    pm:{ sanc:118000, done:72800, pct:62, rel:30.2, util:20.2 },
    pg:{ tgt:840, conn:580, pct:69, kmS:5420, kmD:3740 },
    jj:{ hh:478000, tap:148200, pct:31, safe:68 },
    nl:{ shg:11200, mem:126000, bl:8800, blPct:79, loan:368 } },

  // Delhi
  { id:61, name:"South West Delhi", state:"Delhi",        region:"North",   lat:28.58, lng:76.97, pop:2291755, distress:1,
    lit:89.1, sexRatio:851, elec:100, gw:8, rainDep:24, irr:0, agri:0,
    mg:{ demand:0, pd:0, wage:0, pct:0, hh:0 },
    pm:{ sanc:2800, done:2688, pct:96, rel:0.8, util:0.8 },
    pg:{ tgt:12, conn:12, pct:100, kmS:62, kmD:62 },
    jj:{ hh:48000, tap:46600, pct:97, safe:85 },
    nl:{ shg:880, mem:9900, bl:870, blPct:99, loan:48 } },

  // Andhra - extra
  { id:62, name:"Vizianagaram",  state:"Andhra Pradesh",  region:"South",   lat:18.12, lng:83.40, pop:2344474, distress:5,
    lit:58.9, sexRatio:1006, elec:94, gw:5, rainDep:68, irr:36, agri:46,
    mg:{ demand:242000, pd:10200000, wage:238, pct:67, hh:388000 },
    pm:{ sanc:94000, done:62000, pct:66, rel:24.4, util:17.2 },
    pg:{ tgt:680, conn:476, pct:70, kmS:4580, kmD:3206 },
    jj:{ hh:388000, tap:143600, pct:37, safe:65 },
    nl:{ shg:8900, mem:100000, bl:7200, blPct:81, loan:318 } },

  // TN - extra
  { id:63, name:"Villupuram",    state:"Tamil Nadu",      region:"South",   lat:11.94, lng:79.49, pop:3458873, distress:4,
    lit:79.1, sexRatio:997, elec:97, gw:5, rainDep:52, irr:46, agri:60,
    mg:{ demand:298000, pd:12800000, wage:258, pct:65, hh:468000 },
    pm:{ sanc:118000, done:79100, pct:67, rel:32.8, util:23.3 },
    pg:{ tgt:840, conn:588, pct:70, kmS:5780, kmD:4046 },
    jj:{ hh:468000, tap:196600, pct:42, safe:75 },
    nl:{ shg:11200, mem:126000, bl:9630, blPct:86, loan:418 } },

  // Gujrat - Ahmedabad
  { id:64, name:"Ahmedabad",     state:"Gujarat",         region:"West",    lat:23.02, lng:72.57, pop:7214225, distress:2,
    lit:86.6, sexRatio:903, elec:99, gw:6, rainDep:42, irr:56, agri:70,
    mg:{ demand:128000, pd:6200000, wage:241, pct:78, hh:198000 },
    pm:{ sanc:38000, done:31200, pct:82, rel:10.8, util:9.3 },
    pg:{ tgt:280, conn:267, pct:95, kmS:1980, kmD:1881 },
    jj:{ hh:198000, tap:174200, pct:88, safe:82 },
    nl:{ shg:4600, mem:52000, bl:4370, blPct:95, loan:218 } },

  // Bengaluru Rural
  { id:65, name:"Bengaluru Rural", state:"Karnataka",     region:"South",   lat:13.01, lng:77.58, pop:990923,  distress:2,
    lit:87.2, sexRatio:956, elec:99, gw:5, rainDep:42, irr:54, agri:72,
    mg:{ demand:48000, pd:2680000, wage:274, pct:80, hh:72000 },
    pm:{ sanc:18000, done:15300, pct:85, rel:5.0, util:4.5 },
    pg:{ tgt:160, conn:147, pct:92, kmS:1120, kmD:1030 },
    jj:{ hh:72000, tap:62600, pct:87, safe:88 },
    nl:{ shg:2200, mem:24900, bl:2090, blPct:95, loan:108 } },
];

// ── Computed ──────────────────────────────────────────────────────────────────
export const getConv = (d) => Math.round(
  ((d.mg.pct||0) + d.pm.pct + d.pg.pct + d.jj.pct + d.nl.blPct) / 5
);

export const getCTARA = (d) => {
  const w = (d.jj.pct + Math.max(0, 100 - d.gw * 10)) / 2;
  const e = d.elec;
  const l = Math.min(d.mg.pct || 0, 100);
  const r = d.pg.pct;
  const a = d.agri;
  const h = d.pm.pct;
  return Math.round((w + e + l + r + a + h) / 6);
};

export const getFU = (d) =>
  d.pm.rel ? Math.round((d.pm.util / d.pm.rel) * 100) : 0;

export const distressInfo = (s) => {
  if (s >= 9) return { label:'Critical', c:'#dc2626', bg:'#fef2f2', ring:'#fecaca' };
  if (s >= 7) return { label:'High',     c:'#ea580c', bg:'#fff7ed', ring:'#fed7aa' };
  if (s >= 5) return { label:'Medium',   c:'#ca8a04', bg:'#fefce8', ring:'#fef08a' };
  if (s >= 3) return { label:'Low',      c:'#16a34a', bg:'#f0fdf4', ring:'#bbf7d0' };
  return             { label:'Stable',   c:'#2563eb', bg:'#eff6ff', ring:'#bfdbfe' };
};

export const pctColor = (p) => {
  if (p >= 80) return '#16a34a';
  if (p >= 65) return '#65a30d';
  if (p >= 50) return '#ca8a04';
  if (p >= 35) return '#ea580c';
  return '#dc2626';
};

export const fmtL = (n) => !n ? '—' : n >= 1e7 ? `${(n/1e7).toFixed(1)}Cr`
  : n >= 1e5 ? `${(n/1e5).toFixed(1)}L` : n.toLocaleString('en-IN');

export const stateList = [...new Set(districts.map(d => d.state))].sort();