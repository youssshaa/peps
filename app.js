'use strict';

// ─── Pricing Helper ───────────────────────────────────────────────────────────
const EGP_RATE = 50;
function calcVialPrice(usdFor10) {
  return Math.ceil((usdFor10 * EGP_RATE) / 5) * 5;
}

// ─── Product Catalog ─────────────────────────────────────────────────────────
const products = [
  // GLP-1 / Weight Loss
  { id: 1,   name: 'Semaglutide',              code: 'SM5',       spec: '5mg',       usd10: 36.37,  category: 'glp1' },
  { id: 2,   name: 'Semaglutide',              code: 'SM10',      spec: '10mg',      usd10: 52.18,  category: 'glp1' },
  { id: 3,   name: 'Semaglutide',              code: 'SM15',      spec: '15mg',      usd10: 62.72,  category: 'glp1' },
  { id: 4,   name: 'Semaglutide',              code: 'SM20',      spec: '20mg',      usd10: 67.99,  category: 'glp1' },
  { id: 5,   name: 'Semaglutide',              code: 'SM30',      spec: '30mg',      usd10: 67.99,  category: 'glp1' },
  { id: 6,   name: 'Semaglutide',              code: 'SM40',      spec: '40mg',      usd10: 120.70, category: 'glp1' },
  { id: 7,   name: 'Semaglutide',              code: 'SM50',      spec: '50mg',      usd10: 149.69, category: 'glp1' },
  { id: 8,   name: 'Tirzepatide',              code: 'TR05',      spec: '5mg',       usd10: 38.21,  category: 'glp1' },
  { id: 9,   name: 'Tirzepatide',              code: 'TR10',      spec: '10mg',      usd10: 51.39,  category: 'glp1' },
  { id: 10,  name: 'Tirzepatide',              code: 'TR15',      spec: '15mg',      usd10: 65.36,  category: 'glp1' },
  { id: 11,  name: 'Tirzepatide',              code: 'TR20',      spec: '20mg',      usd10: 73.27,  category: 'glp1' },
  { id: 12,  name: 'Tirzepatide',              code: 'TR30',      spec: '30mg',      usd10: 91.71,  category: 'glp1' },
  { id: 13,  name: 'Tirzepatide',              code: 'TR40',      spec: '40mg',      usd10: 110.16, category: 'glp1' },
  { id: 14,  name: 'Tirzepatide',              code: 'TR50',      spec: '50mg',      usd10: 139.15, category: 'glp1' },
  { id: 15,  name: 'Tirzepatide',              code: 'TR60',      spec: '60mg',      usd10: 168.14, category: 'glp1' },
  { id: 16,  name: 'Tirzepatide',              code: 'TR80',      spec: '80mg',      usd10: 284.63, category: 'glp1' },
  { id: 17,  name: 'Tirzepatide',              code: 'TR100',     spec: '100mg',     usd10: 337.34, category: 'glp1' },
  { id: 18,  name: 'Retatrutide',              code: 'RT05',      spec: '5mg',       usd10: 44.28,  category: 'glp1' },
  { id: 19,  name: 'Retatrutide',              code: 'RT10',      spec: '10mg',      usd10: 75.90,  category: 'glp1' },
  { id: 20,  name: 'Retatrutide',              code: 'RT15',      spec: '15mg',      usd10: 102.25, category: 'glp1' },
  { id: 21,  name: 'Retatrutide',              code: 'RT20',      spec: '20mg',      usd10: 120.70, category: 'glp1' },
  { id: 22,  name: 'Retatrutide',              code: 'RT30',      spec: '30mg',      usd10: 131.24, category: 'glp1' },
  { id: 23,  name: 'Retatrutide',              code: 'RT40',      spec: '40mg',      usd10: 181.32, category: 'glp1' },
  { id: 24,  name: 'Retatrutide',              code: 'RT50',      spec: '50mg',      usd10: 231.92, category: 'glp1' },
  { id: 25,  name: 'Retatrutide',              code: 'RT60',      spec: '60mg',      usd10: 258.27, category: 'glp1' },
  { id: 26,  name: 'Retatrutide',              code: 'RT80',      spec: '80mg',      usd10: 337.34, category: 'glp1' },
  { id: 27,  name: 'Retatrutide',              code: 'RT100',     spec: '100mg',     usd10: 390.04, category: 'glp1' },
  { id: 28,  name: 'Liraglutide',              code: 'LIR05',     spec: '5mg',       usd10: 90.92,  category: 'glp1' },
  { id: 29,  name: 'Liraglutide',              code: 'LIR10',     spec: '10mg',      usd10: 155.49, category: 'glp1' },
  { id: 30,  name: 'Liraglutide',              code: 'LIR30',     spec: '30mg',      usd10: 453.29, category: 'glp1' },
  { id: 31,  name: 'AOD9604',                  code: '5ad',       spec: '5mg',       usd10: 91.71,  category: 'glp1' },
  { id: 32,  name: 'AOD9604',                  code: '10ad',      spec: '10mg',      usd10: 157.60, category: 'glp1' },
  { id: 33,  name: 'Cagrilintide',             code: 'CG05',      spec: '5mg',       usd10: 131.77, category: 'glp1' },
  { id: 34,  name: 'Cagrilintide',             code: 'CG10',      spec: '10mg',      usd10: 221.38, category: 'glp1' },
  { id: 35,  name: 'Cagrisema (Cagrilintide + Sema 2.5+2.5mg)', code: 'CS5',  spec: '5mg',  usd10: 84.33,  category: 'glp1' },
  { id: 36,  name: 'Cagrisema (Cagrilintide + Sema 5+5mg)',     code: 'CS10', spec: '10mg', usd10: 147.58, category: 'glp1' },

  // Growth Hormone & GHRP
  { id: 37,  name: 'HGH',                      code: 'H10',       spec: '10iu',      usd10: 60.61,  category: 'gh' },
  { id: 38,  name: 'HGH',                      code: 'H12',       spec: '12iu',      usd10: 73.79,  category: 'gh' },
  { id: 39,  name: 'HGH',                      code: 'H15',       spec: '15iu',      usd10: 89.60,  category: 'gh' },
  { id: 40,  name: 'HGH',                      code: 'H24',       spec: '24iu',      usd10: 129.14, category: 'gh' },
  { id: 41,  name: 'HGH',                      code: 'H36',       spec: '36iu',      usd10: 184.48, category: 'gh' },
  { id: 42,  name: 'HGH Fragment 176-191',      code: 'FR1',       spec: '1mg',       usd10: 40.85,  category: 'gh' },
  { id: 43,  name: 'HGH Fragment 176-191',      code: 'FR2',       spec: '2mg',       usd10: 52.71,  category: 'gh' },
  { id: 44,  name: 'HGH Fragment 176-191',      code: 'FR5',       spec: '5mg',       usd10: 92.24,  category: 'gh' },
  { id: 45,  name: 'HGH Fragment 176-191',      code: 'FR10',      spec: '10mg',      usd10: 158.13, category: 'gh' },
  { id: 46,  name: 'HGH Fragment 176-191',      code: 'FR12',      spec: '12mg',      usd10: 176.57, category: 'gh' },
  { id: 47,  name: 'HGH Fragment 176-191',      code: 'FR15',      spec: '15mg',      usd10: 218.74, category: 'gh' },
  { id: 48,  name: 'Ipamorelin',               code: 'IP2',       spec: '2mg',       usd10: 35.58,  category: 'gh' },
  { id: 49,  name: 'Ipamorelin',               code: 'IP05',      spec: '5mg',       usd10: 41.64,  category: 'gh' },
  { id: 50,  name: 'Ipamorelin',               code: 'IP10',      spec: '10mg',      usd10: 52.18,  category: 'gh' },
  { id: 51,  name: 'Tesamorelin',              code: 'TSM02',     spec: '2mg',       usd10: 52.18,  category: 'gh' },
  { id: 52,  name: 'Tesamorelin',              code: 'TSM05',     spec: '5mg',       usd10: 104.89, category: 'gh' },
  { id: 53,  name: 'Tesamorelin',              code: 'TSM10',     spec: '10mg',      usd10: 181.32, category: 'gh' },
  { id: 54,  name: 'Tesamorelin',              code: 'TSM20',     spec: '20mg',      usd10: 252.47, category: 'gh' },
  { id: 55,  name: 'CJC-1295 with DAC',        code: 'CD02',      spec: '2mg',       usd10: 81.17,  category: 'gh' },
  { id: 56,  name: 'CJC-1295 with DAC',        code: 'CD05',      spec: '5mg',       usd10: 168.14, category: 'gh' },
  { id: 57,  name: 'CJC-1295 without DAC',     code: 'CND05',     spec: '5mg',       usd10: 72.47,  category: 'gh' },
  { id: 58,  name: 'CJC-1295 without DAC',     code: 'CND10',     spec: '10mg',      usd10: 122.55, category: 'gh' },
  { id: 59,  name: 'CJC-1295 w/o DAC + Ipamorelin', code: 'CP10', spec: '10mg',     usd10: 83.81,  category: 'gh' },
  { id: 60,  name: 'Sermorelin',               code: 'SMO5',      spec: '5mg',       usd10: 79.06,  category: 'gh' },
  { id: 61,  name: 'Sermorelin',               code: 'SMO10',     spec: '10mg',      usd10: 134.41, category: 'gh' },
  { id: 62,  name: 'Hexarelin',                code: 'HX2',       spec: '2mg',       usd10: 55.34,  category: 'gh' },
  { id: 63,  name: 'Hexarelin',                code: 'HX5',       spec: '5mg',       usd10: 110.69, category: 'gh' },
  { id: 64,  name: 'MOTS-C',                   code: 'MS10',      spec: '10mg',      usd10: 60.61,  category: 'gh' },
  { id: 65,  name: 'MOTS-C',                   code: 'MS20',      spec: '20mg',      usd10: 118.59, category: 'gh' },
  { id: 66,  name: 'MOTS-C',                   code: 'MS40',      spec: '40mg',      usd10: 202.93, category: 'gh' },

  // Recovery & Healing
  { id: 67,  name: 'BPC-157',                  code: 'BC02',      spec: '2mg',       usd10: 22.40,  category: 'recovery' },
  { id: 68,  name: 'BPC-157',                  code: 'BC05',      spec: '5mg',       usd10: 38.21,  category: 'recovery' },
  { id: 69,  name: 'BPC-157',                  code: 'BC10',      spec: '10mg',      usd10: 57.98,  category: 'recovery' },
  { id: 70,  name: 'TB-500 (Thymosin Beta 4)', code: 'bt05',      spec: '5mg',       usd10: 86.44,  category: 'recovery' },
  { id: 71,  name: 'TB-500',                   code: 'bt10',      spec: '10mg',      usd10: 154.96, category: 'recovery' },
  { id: 72,  name: 'BPC-157 5mg + TB-500 5mg', code: 'BB10',      spec: '10mg',      usd10: 94.35,  category: 'recovery' },
  { id: 73,  name: 'BPC-157 10mg + TB-500 10mg', code: 'BB20',    spec: '20mg',      usd10: 157.60, category: 'recovery' },
  { id: 74,  name: 'BPC-157 10mg + GHK-Cu 50mg + TB-500 10mg', code: 'BBG70', spec: '70mg', usd10: 181.32, category: 'recovery' },
  { id: 75,  name: 'BPC-157 10mg + TB-500 10mg + GHK-Cu 50mg + KPV 10mg', code: 'KLOW80', spec: '80mg', usd10: 207.67, category: 'recovery' },
  { id: 76,  name: 'GHK-Cu',                   code: 'CU50',      spec: '50mg',      usd10: 26.00,  category: 'recovery' },
  { id: 77,  name: 'GHK-Cu',                   code: 'CU100',     spec: '100mg',     usd10: 29.00,  category: 'recovery' },
  { id: 78,  name: 'Epithalon',                code: 'ET10',      spec: '10mg',      usd10: 49.55,  category: 'recovery' },
  { id: 79,  name: 'Epithalon',                code: 'ET50',      spec: '50mg',      usd10: 147.58, category: 'recovery' },

  // Cognitive & Brain
  { id: 80,  name: 'Selank',                   code: 'SK05',      spec: '5mg',       usd10: 39.00,  category: 'cognitive' },
  { id: 81,  name: 'Selank',                   code: 'SK10',      spec: '10mg',      usd10: 57.45,  category: 'cognitive' },
  { id: 82,  name: 'Semax',                    code: 'xa05',      spec: '5mg',       usd10: 39.00,  category: 'cognitive' },
  { id: 83,  name: 'Semax',                    code: 'XA10',      spec: '10mg',      usd10: 57.45,  category: 'cognitive' },
  { id: 84,  name: 'Dihexa',                   code: 'DIH05',     spec: '5mg',       usd10: 47.44,  category: 'cognitive' },
  { id: 85,  name: 'Dihexa',                   code: 'DIH10',     spec: '10mg',      usd10: 69.84,  category: 'cognitive' },
  { id: 86,  name: 'Pinealon',                 code: 'PIN05',     spec: '5mg',       usd10: 42.17,  category: 'cognitive' },
  { id: 87,  name: 'Pinealon',                 code: 'PIN10',     spec: '10mg',      usd10: 64.57,  category: 'cognitive' },
  { id: 88,  name: 'SS-31',                    code: '2S10',      spec: '10mg',      usd10: 83.81,  category: 'cognitive' },
  { id: 89,  name: 'SS-31',                    code: '2S50',      spec: '50mg',      usd10: 286.73, category: 'cognitive' },
  { id: 90,  name: 'DSIP',                     code: 'DS05',      spec: '5mg',       usd10: 47.44,  category: 'cognitive' },
  { id: 91,  name: 'DSIP',                     code: 'DS10',      spec: '10mg',      usd10: 81.43,  category: 'cognitive' },

  // Anti-Aging & Longevity
  { id: 92,  name: 'NAD+',                     code: 'NJ100',     spec: '100mg',     usd10: 31.63,  category: 'antiaging' },
  { id: 93,  name: 'NAD+',                     code: 'NJ500',     spec: '500mg',     usd10: 39.53,  category: 'antiaging' },
  { id: 94,  name: 'NAD+',                     code: 'NJ1000',    spec: '1000mg',    usd10: 52.18,  category: 'antiaging' },
  { id: 95,  name: 'Thymalin / Thymulin',      code: 'TY10',      spec: '10mg',      usd10: 71.16,  category: 'antiaging' },
  { id: 96,  name: 'Thymosin Alpha-1',         code: 'TA05',      spec: '5mg',       usd10: 105.42, category: 'antiaging' },
  { id: 97,  name: 'Thymosin Alpha-1',         code: 'TA10',      spec: '10mg',      usd10: 171.30, category: 'antiaging' },
  { id: 98,  name: 'KPV',                      code: 'KPV05',     spec: '5mg',       usd10: 39.00,  category: 'antiaging' },
  { id: 99,  name: 'KPV',                      code: 'KPV10',     spec: '10mg',      usd10: 54.82,  category: 'antiaging' },

  // Sexual Health & Hormones
  { id: 100, name: 'PT-141 (Bremelanotide)',    code: 'PT141',     spec: '10mg',      usd10: 62.72,  category: 'sexual' },
  { id: 101, name: 'Melanotan II',              code: 'MT-2',      spec: '10mg',      usd10: 57.45,  category: 'sexual' },
  { id: 102, name: 'Melanotan I',               code: 'MT-1',      spec: '10mg',      usd10: 57.45,  category: 'sexual' },
  { id: 103, name: 'Kisspeptin-10',             code: 'KS05',      spec: '5mg',       usd10: 52.71,  category: 'sexual' },
  { id: 104, name: 'Kisspeptin-10',             code: 'KS10',      spec: '10mg',      usd10: 83.81,  category: 'sexual' },
  { id: 105, name: 'HCG',                       code: 'G1K',       spec: '1000iu',    usd10: 42.17,  category: 'sexual' },
  { id: 106, name: 'HCG',                       code: 'G2K',       spec: '2000iu',    usd10: 48.76,  category: 'sexual' },
  { id: 107, name: 'HCG',                       code: 'G5K',       spec: '5000iu',    usd10: 89.60,  category: 'sexual' },
  { id: 108, name: 'HCG',                       code: 'G10K',      spec: '10000iu',   usd10: 144.95, category: 'sexual' },
  { id: 109, name: 'HMG',                       code: 'MG',        spec: '75iu',      usd10: 64.57,  category: 'sexual' },
  { id: 110, name: 'Oxytocin',                  code: 'OT05',      spec: '5mg',       usd10: 47.44,  category: 'sexual' },
  { id: 111, name: 'Oxytocin',                  code: 'OT10',      spec: '10mg',      usd10: 63.25,  category: 'sexual' },
  { id: 112, name: 'Triptorellin',              code: 'Triptorelln', spec: '2mg',     usd10: 47.44,  category: 'sexual' },

  // Beauty & Aesthetics
  { id: 113, name: 'Snap-8',                    code: 'NP810',     spec: '10mg',      usd10: 42.17,  category: 'beauty' },
  { id: 114, name: 'Lemon Bottle',              code: 'Lemon',     spec: '10ml',      usd10: 61.93,  category: 'beauty' },
  { id: 115, name: 'Glutathione',               code: 'GTT400',    spec: '400mg',     usd10: 28.99,  category: 'beauty' },
  { id: 116, name: 'Glutathione',               code: 'GTT600',    spec: '600mg',     usd10: 44.28,  category: 'beauty' },
  { id: 117, name: 'Glutathione',               code: 'GTT1500',   spec: '1500mg',    usd10: 55.34,  category: 'beauty' },

  // Fitness & Performance
  { id: 119, name: '5-Amino-1MQ',               code: '5AM05',     spec: '5mg',       usd10: 33.73,  category: 'fitness' },
  { id: 120, name: '5-Amino-1MQ',               code: '5AM10',     spec: '10mg',      usd10: 36.37,  category: 'fitness' },
  { id: 121, name: '5-Amino-1MQ',               code: '50AM',      spec: '50mg',      usd10: 94.35,  category: 'fitness' },
  { id: 122, name: 'AICAR',                     code: 'AR50',      spec: '50mg',      usd10: 81.70,  category: 'fitness' },
  { id: 123, name: 'AICAR',                     code: 'AR100',     spec: '100mg',     usd10: 113.32, category: 'fitness' },
  { id: 124, name: 'Adamax',                    code: 'Ax5',       spec: '5mg',       usd10: 84.55,  category: 'fitness' },
  { id: 125, name: 'Adamax',                    code: 'AX10',      spec: '10mg',      usd10: 117.86, category: 'fitness' },
  { id: 126, name: 'SLU-PP-332',               code: '332',       spec: '5mg',       usd10: 73.79,  category: 'fitness' },
  { id: 127, name: 'IGF-1 LR3',                code: 'IG0.1',     spec: '100mcg',    usd10: 49.55,  category: 'fitness' },
  { id: 128, name: 'IGF-1 LR3',                code: 'IG1MG',     spec: '1mg',       usd10: 210.31, category: 'fitness' },

  // IV & Support Solutions
  { id: 129, name: 'VIP',                       code: 'VP05',      spec: '5mg',       usd10: 81.70,  category: 'iv' },
  { id: 130, name: 'VIP',                       code: 'VP10',      spec: '10mg',      usd10: 137.04, category: 'iv' },
  { id: 131, name: 'L-Carnitine',               code: 'LC400',     spec: '400mg',     usd10: 52.71,  category: 'iv' },
  { id: 132, name: 'L-Carnitine',               code: 'LC600',     spec: '600mg',     usd10: 57.98,  category: 'iv' },
  { id: 133, name: 'L-Carnitine',               code: 'LC1200',    spec: '1200mg',    usd10: 63.25,  category: 'iv' },
  { id: 134, name: 'Lipo-B',                    code: 'lc120',     spec: '10ml',      usd10: 57.98,  category: 'iv' },
  { id: 135, name: 'Lipo-C',                    code: 'LC216',     spec: '10ml',      usd10: 61.93,  category: 'iv' },
  { id: 136, name: 'MIC (Lipo-C + B12)',         code: 'MIC',       spec: '10ml',      usd10: 110.69, category: 'iv' },
  { id: 137, name: 'B12 Solution',              code: 'B12',       spec: '10ml',      usd10: 58.00,  category: 'iv' },
  { id: 138, name: 'LL-37',                     code: '375',       spec: '5mg',       usd10: 110.69, category: 'iv' },
  { id: 139, name: 'CBL-60',                    code: 'CBL60',     spec: '60mg',      usd10: 78.54,  category: 'iv' },
  { id: 140, name: 'BAC Water',                 code: 'WA03',      spec: '3ml',       usd10: 6.41,   category: 'iv' },
  { id: 141, name: 'BAC Water',                 code: 'WA05',      spec: '5ml',       usd10: 7.69,   category: 'iv' },
  { id: 142, name: 'BAC Water',                 code: 'WA10',      spec: '10ml',      usd10: 8.97,   category: 'iv' },
  { id: 143, name: 'Benzyl Alcohol 0.9%',       code: 'BA03',      spec: '3ml',       usd10: 6.41,   category: 'iv' },
  { id: 144, name: 'Benzyl Alcohol 0.9%',       code: 'BA05',      spec: '5ml',       usd10: 7.69,   category: 'iv' },
  { id: 145, name: 'Benzyl Alcohol 0.9%',       code: 'BA10',      spec: '10ml',      usd10: 8.97,   category: 'iv' },
  { id: 146, name: 'Acetic Acid Water 0.6%',    code: 'AA03',      spec: '3ml',       usd10: 7.69,   category: 'iv' },
  { id: 147, name: 'Acetic Acid Water 0.6%',    code: 'AA05',      spec: '5ml',       usd10: 8.97,   category: 'iv' },
  { id: 148, name: 'Acetic Acid Water 0.6%',    code: 'AA10',      spec: '10ml',      usd10: 10.25,  category: 'iv' },
];

// ─── Category Labels ──────────────────────────────────────────────────────────
const categories = [
  { key: 'all',       label: 'All Products' },
  { key: 'glp1',      label: 'GLP-1 / Weight Loss' },
  { key: 'gh',        label: 'Growth Hormone' },
  { key: 'recovery',  label: 'Recovery & Healing' },
  { key: 'cognitive', label: 'Cognitive & Brain' },
  { key: 'antiaging', label: 'Anti-Aging' },
  { key: 'sexual',    label: 'Sexual Health' },
  { key: 'beauty',    label: 'Beauty & Aesthetics' },
  { key: 'fitness',   label: 'Fitness & Performance' },
  { key: 'iv',        label: 'IV & Support' },
];

// ─── State ────────────────────────────────────────────────────────────────────
let cart = [];
let activeCategory = 'all';
let searchQuery = '';

// ─── DOM References ───────────────────────────────────────────────────────────
const productGrid      = document.getElementById('product-grid');
const cartSidebar      = document.getElementById('cart-sidebar');
const cartOverlay      = document.getElementById('cart-overlay');
const cartItemsList    = document.getElementById('cart-items');
const cartTotal        = document.getElementById('cart-total');
const cartBadge        = document.getElementById('cart-badge');
const cartCount        = document.getElementById('cart-count');
const searchInput      = document.getElementById('search-input');
const categoryTabsEl   = document.getElementById('category-tabs');
const productCountEl   = document.getElementById('product-count');

// ─── Render Category Tabs ─────────────────────────────────────────────────────
function renderCategoryTabs() {
  categoryTabsEl.innerHTML = categories.map(cat => `
    <button
      class="cat-tab ${cat.key === activeCategory ? 'active' : ''}"
      data-cat="${cat.key}"
    >${cat.label}</button>
  `).join('');
}

// ─── Filter Products ──────────────────────────────────────────────────────────
function getFilteredProducts() {
  return products.filter(p => {
    const matchesCat    = activeCategory === 'all' || p.category === activeCategory;
    const q             = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.spec.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });
}

// ─── Render Product Grid ──────────────────────────────────────────────────────
function renderProducts() {
  const filtered = getFilteredProducts();
  productCountEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div class="no-results">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p>No products found. Try a different search or category.</p>
      </div>`;
    return;
  }

  productGrid.innerHTML = filtered.map(p => {
    const price     = calcVialPrice(p.usd10);
    const inCart    = cart.find(c => c.id === p.id);
    const cartQty   = inCart ? inCart.qty : 0;
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-card__badge">${getCategoryLabel(p.category)}</div>
        <div class="product-card__body">
          <h3 class="product-card__name">${p.name}</h3>
          <div class="product-card__meta">
            <span class="product-card__spec">${p.spec}</span>
            <span class="product-card__code">Code: ${p.code}</span>
          </div>
          <div class="product-card__pricing">
            <span class="product-card__price">${price.toLocaleString('en-EG')} EGP</span>
            <span class="product-card__per">per vial</span>
          </div>
        </div>
        <div class="product-card__actions">
          ${cartQty === 0
            ? `<button class="btn-add" data-id="${p.id}">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                   <line x1="3" y1="6" x2="21" y2="6"/>
                   <path d="M16 10a4 4 0 0 1-8 0"/>
                 </svg>
                 Add to Cart
               </button>`
            : `<div class="qty-control">
                 <button class="qty-btn qty-dec" data-id="${p.id}">−</button>
                 <span class="qty-value">${cartQty}</span>
                 <button class="qty-btn qty-inc" data-id="${p.id}">+</button>
               </div>`
          }
        </div>
      </div>`;
  }).join('');
}

function getCategoryLabel(key) {
  const cat = categories.find(c => c.key === key);
  return cat ? cat.label : key;
}

// ─── Cart Logic ───────────────────────────────────────────────────────────────
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1, name: product.name, spec: product.spec, code: product.code, price: calcVialPrice(product.usd10) });
  }
  updateCartUI();
  renderProducts();
  animateCartBadge();
}

function decrementCart(id) {
  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;
  cart[idx].qty -= 1;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
  renderProducts();
}

function incrementCart(id) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty += 1;
    updateCartUI();
    renderProducts();
  }
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
  renderProducts();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const total = getCartTotal();
  const count = getCartItemCount();

  // Badge
  cartBadge.style.display = count > 0 ? 'flex' : 'none';
  cartBadge.textContent   = count > 99 ? '99+' : count;
  cartCount.textContent   = count;

  // Cart total
  cartTotal.textContent = total.toLocaleString('en-EG') + ' EGP';

  // Cart items list
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Your cart is empty</p>
      </div>`;
    return;
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item__info">
        <span class="cart-item__name">${item.name}</span>
        <span class="cart-item__spec">${item.spec} &bull; ${item.code}</span>
        <span class="cart-item__unit">${item.price.toLocaleString('en-EG')} EGP / vial</span>
      </div>
      <div class="cart-item__controls">
        <div class="qty-control qty-control--sm">
          <button class="qty-btn qty-dec" data-id="${item.id}">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn qty-inc" data-id="${item.id}">+</button>
        </div>
        <span class="cart-item__subtotal">${(item.price * item.qty).toLocaleString('en-EG')} EGP</span>
        <button class="cart-item__remove" data-remove="${item.id}" title="Remove">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// ─── WhatsApp Order ───────────────────────────────────────────────────────────
function buildWhatsAppMessage() {
  const lines = ['*PeptideEgypt Order*', ''];
  cart.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.name} ${item.spec} (${item.code})`);
    lines.push(`   Qty: ${item.qty} vial${item.qty > 1 ? 's' : ''} × ${item.price.toLocaleString('en-EG')} EGP = ${(item.price * item.qty).toLocaleString('en-EG')} EGP`);
  });
  lines.push('');
  lines.push(`*Total: ${getCartTotal().toLocaleString('en-EG')} EGP*`);
  lines.push('');
  lines.push('Please confirm my order. Thank you!');
  return encodeURIComponent(lines.join('\n'));
}

function orderViaWhatsApp() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  const phone   = '201000000000';
  const message = buildWhatsAppMessage();
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// ─── Cart Sidebar Toggle ──────────────────────────────────────────────────────
function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('visible');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('visible');
  document.body.classList.remove('no-scroll');
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─── Cart Badge Animation ─────────────────────────────────────────────────────
function animateCartBadge() {
  cartBadge.classList.remove('bounce');
  void cartBadge.offsetWidth;
  cartBadge.classList.add('bounce');
}

// ─── Event Delegation ─────────────────────────────────────────────────────────
productGrid.addEventListener('click', e => {
  const btnAdd = e.target.closest('.btn-add');
  const btnDec = e.target.closest('.qty-dec');
  const btnInc = e.target.closest('.qty-inc');

  if (btnAdd) {
    const id = parseInt(btnAdd.dataset.id, 10);
    addToCart(id);
    showToast('Added to cart');
  } else if (btnDec) {
    const id = parseInt(btnDec.dataset.id, 10);
    decrementCart(id);
  } else if (btnInc) {
    const id = parseInt(btnInc.dataset.id, 10);
    incrementCart(id);
  }
});

cartItemsList.addEventListener('click', e => {
  const btnDec    = e.target.closest('.qty-dec');
  const btnInc    = e.target.closest('.qty-inc');
  const btnRemove = e.target.closest('[data-remove]');

  if (btnDec) {
    decrementCart(parseInt(btnDec.dataset.id, 10));
  } else if (btnInc) {
    incrementCart(parseInt(btnInc.dataset.id, 10));
  } else if (btnRemove) {
    removeFromCart(parseInt(btnRemove.dataset.remove, 10));
  }
});

categoryTabsEl.addEventListener('click', e => {
  const tab = e.target.closest('.cat-tab');
  if (!tab) return;
  activeCategory = tab.dataset.cat;
  renderCategoryTabs();
  renderProducts();
  window.scrollTo({ top: document.getElementById('catalog').offsetTop - 80, behavior: 'smooth' });
});

searchInput.addEventListener('input', e => {
  searchQuery = e.target.value;
  renderProducts();
});

document.getElementById('cart-toggle').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('whatsapp-order').addEventListener('click', orderViaWhatsApp);
document.getElementById('hero-cta').addEventListener('click', () => {
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
});

// Mobile menu
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// Close mobile menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

// Smooth scroll nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Sticky Header Shadow ─────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ─── Dismiss disclaimer banner ────────────────────────────────────────────────
document.getElementById('dismiss-banner').addEventListener('click', () => {
  document.getElementById('disclaimer-banner').style.display = 'none';
});

// ─── Init ─────────────────────────────────────────────────────────────────────
renderCategoryTabs();
renderProducts();
updateCartUI();
