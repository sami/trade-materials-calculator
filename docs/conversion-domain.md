# Conversion domain

This defines what the conversion tool converts, the factor behind every conversion, and the fixtures it has to pass. It's a measure and unit converter, not a job-type calculator. There's no currency or pricing conversion.

## Which conversions are supported?

| Family | Units | Directions |
|---|---|---|
| Length | millimetres, metres, feet, inches | Any to any. Feet and inches can be entered and shown as a combined value, for example 7 ft 10.49 in. |
| Area | square metres, square feet | Either way. |
| Volume | cubic metres, litres | Either way. Bulk bags aren't supported yet (see below). |
| Mass | kilogrammes, tonnes | Either way. |

Two cases cross between families. Linear to square came up directly in the survey (R3). Coverage to packs is part of the tool's definition in the context brief.

- **Linear to square.** Area = length × cover width. Both lengths are converted to metres before they're multiplied. The cover width is an input the assistant reads off the product, not a stored constant.
- **Coverage to packs.** Packs = quantity ÷ coverage per pack, rounded **up** to a whole pack, because part packs can't be sold. The coverage figure (m² per pack, litres per bag, kg per bag) is also an input from the product.

Nothing converts between volume and mass. That needs a density, which depends on the material, so it belongs to the concrete and hardcore registers.

## What are the factors?

Every factor below is exact by legal definition. None of them is rounded or measured.

| ID | Conversion | Value | Derivation | Source | Source date |
|---|---|---|---|---|---|
| CONV-01 | 1 m = 1000 mm | 1000 | SI prefix milli = 10⁻³ | BIPM, *The International System of Units (SI Brochure)*, 9th edition, section 3 | 2019, updated 2026 |
| CONV-02 | 1 in = 25.4 mm | 25.4 | inch = 1/36 yard; yard = 0.9144 m; 0.9144 ÷ 36 = 0.0254 m | Weights and Measures Act 1985, Sch. 1, Part VI | Text current to 12 Sep 2026 |
| CONV-03 | 1 ft = 12 in | 12 | foot = 1/3 yard; inch = 1/36 yard | Weights and Measures Act 1985, Sch. 1, Part VI | Text current to 12 Sep 2026 |
| CONV-04 | 1 ft = 0.3048 m | 0.3048 | 0.9144 ÷ 3 | Weights and Measures Act 1985, Sch. 1, Part VI | Text current to 12 Sep 2026 |
| CONV-05 | 1 ft² = 0.09290304 m² | 0.09290304 | square foot = 1/9 square yard; 0.9144² ÷ 9 = 0.83612736 ÷ 9 | Weights and Measures Act 1985, Sch. 1, Part VI | Text current to 12 Sep 2026 |
| CONV-06 | 1 m³ = 1000 L | 1000 | litre = 1 dm³; 1 m³ = 1000 dm³ | Weights and Measures Act 1985, Sch. 1, Part IV | Text current to 12 Sep 2026 |
| CONV-07 | 1 t = 1000 kg | 1000 | "Tonne, metric tonne = 1000 kilograms" | Weights and Measures Act 1985, Sch. 1, Part V | Text current to 12 Sep 2026 |

All sources were accessed on 13 September 2026 on legislation.gov.uk (`/ukpga/1985/72/schedule/1`) and bipm.org.

Schedule 1 has a pending amendment, "omitted by 2025 c. 20 s. 11(3)", which isn't in force yet. None of the values will change, but the citation will. Check it again before submission.

## How are results rounded?

Every chain is worked exactly and rounded once, at the end. Pack counts round up. Everything else rounds half up to this precision:

| Unit | Shown to |
|---|---|
| mm | 1 dp |
| m | 3 dp |
| in (including the inches part of ft + in) | 2 dp |
| m², ft² | 2 dp |
| m³ | 3 dp |
| L | 1 dp |
| kg | 1 dp |
| t | 3 dp |

For a combined feet and inches value, whole feet are taken from the exact total first, and only then is the remainder rounded. If the remainder rounds to 12.00 in, it carries into the next foot.

"Worked exactly" is a requirement on results, not a choice of technique. Fixtures F4 and F5 show why it matters. Plain binary floating point gets the wrong whole-pack count on ordinary counter inputs. The technique itself (integer base units, rationals or decimals) is decided at scaffolding.

## Fixtures

Every fixture's inputs are constructed for the test, and its factors come from the register above. The floating-point values quoted are IEEE 754 double precision, the number type JavaScript uses.

### F1. Millimetres to feet and inches

- **Inputs:** 2400 mm.
- **Working:** 2400 ÷ 25.4 = 12000/127 in = 94.488188… in. 94.488… ÷ 12 = 7 whole feet. The remainder is 94.488188… − 84 = 10.488188… in.
- **Expected:** 2.400 m, 94.49 in, 7 ft 10.49 in.
- **Source:** CONV-01, CONV-02, CONV-03.

### F2. Round trip, feet and inches to metres and back

- **Inputs:** 12 ft 6 in.
- **Working:** (12 × 12) + 6 = 150 in. 150 × 25.4 = 3810 mm = 3.810 m. Back again: 3810 ÷ 25.4 = 150 in = 12 ft 6 in.
- **Expected:** 3.810 m, then exactly 12 ft 6.00 in. A result of 12 ft 5.99 in, or 12 ft 6.01 in, fails. Feeding the displayed 3.810 m back in has to give the same answer.
- **Source:** CONV-01, CONV-02, CONV-03.

### F3. Linear to square

- **Inputs:** 36 linear metres of board with a 125 mm cover width.
- **Working:** 125 mm = 0.125 m. 36 × 0.125 = 4.5 m². In square feet, 4.5 ÷ 0.09290304 = 781250/16129 = 48.437596… ft².
- **Expected:** 4.50 m², 48.44 ft².
- **Source:** CONV-01, CONV-05.

### F4. Coverage to packs, volume

- **Inputs:** 0.9 m³, and a product sold in 40 L bags.
- **Working:** 0.9 × 1000 = 900 L. 900 ÷ 40 = 22.5 bags, which rounds up to 23.
- **Expected:** 900.0 L, 23 bags.
- **Source:** CONV-06.

### F5. Floating-point ordering

- **Inputs:** three wall lengths of 2.1 m, 0.8 m and 0.1 m, entered in that order. The wall height is 2.4 m, and the pack covers 2.4 m².
- **Working (exact):** 2.1 + 0.8 + 0.1 = 3.0 m. 3.0 × 2.4 = 7.2 m². 7.2 ÷ 2.4 = 3 packs exactly, so no rounding up is needed.
- **Working (naive floating point, left to right):** (2.1 + 0.8) + 0.1 = 3.0000000000000004. × 2.4 = 7.200000000000001. ÷ 2.4 = 3.0000000000000004, which rounds up to **4 packs**. Entered as 0.1, 0.8, 2.1, the same sum gives exactly 3.0 and 3 packs.
- **Expected:** 3 packs whatever order the walls are entered in. The total area shows as 7.20 m².
- **Source:** constructed. Values confirmed in IEEE 754 double precision. No factor is involved.

A second trap of the same kind: 1.5 linear metres of 200 mm board, in packs that cover 0.3 m². Converting 200 mm to 0.2 m first gives 1.5 × 0.2 = 0.30000000000000004, then 1.0000000000000002 packs, which rounds up to 2. The exact answer is 1.

### F6. EC7, one wall in three unit systems

- **Inputs:** a single wall, entered three ways: 16 ft × 8 ft; 4876.8 mm × 2438.4 mm; 4.8768 m × 2.4384 m.
- **Working:** 16 × 8 = 128 ft². 128 × 0.09290304 = 11.89158912 m². 4.8768 × 2.4384 = 11.89158912 m², and 4876.8 × 2438.4 ÷ 1,000,000 gives the same. Exactly, all three are 4645152/390625 m².
- **Expected:** all three entries show 11.89 m² and 128.00 ft², identically.
- **Source:** CONV-01, CONV-04, CONV-05.
- **Note:** routing the imperial entry through inches in floating point (192 in × 96 in × 0.0254²) gives 11.891589119999997. That still shows as 11.89 after a single final rounding, but only exact working makes the three results equal before display, so that's what the test should assert.

## Worked example: is 12 mm half an inch?

No. Half an inch is 12.7 mm. A participant raised this directly (R5).

- 0.5 in × 25.4 = 12.7 mm (CONV-02). The difference is 0.7 mm.
- Going the other way, 12 mm ÷ 25.4 = 60/127 in = 0.47 in, not 0.50 in.
- Treating 12 mm as half an inch understates the imperial size by 5.5% (0.7 ÷ 12.7). Treating half an inch as 12 mm overstates the metric figure by 5.8% (0.7 ÷ 12).
- The error adds up. Twenty 12 mm boards stacked make 240 mm, but twenty half-inch boards make 254 mm, so the stack is 14 mm out.

## Why aren't bulk bags supported?

A bulk bag isn't a unit of volume. SELCO sells it by weight:

- "At Selco, our bulk bags weigh between 750kg-850kg, but this can vary depending on moisture content."
- "An 800kg bulk bag will contain roughly the same amount of aggregate as 32 x 25kg bags."

Source: selcobw.com, *Jumbo bags* product category page, accessed 13 September 2026. The page is undated.

Turning bags into cubic metres needs the bulk density of each material, and a 100 kg spread of bag weights on top of that. The bag's 850 × 850 × 850 mm size (0.614 m³) is the container, not the fill, so it can't be used as a factor.

Until a sourced density exists, bags to cubic metres stays out of the converter. Bags to kilogrammes is only a range, so it isn't a factor either.
