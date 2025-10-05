import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

type RoutineRequest = {
  skinType?: string;
  score?: number;
  climate?: string;
  skinConcerns?: string[];
  steps?: number;
  times?: number;
  diagnosedDisease?: string; // new: primary diagnosed disease/condition name
  diagnosisDetails?: { name: string; confidence?: number }[]; // optional: full list from analyzer
};

export async function POST(req: Request) {
  const body: RoutineRequest = await req.json();
  const { skinType = "", score = 50, climate = "", skinConcerns = [], steps = 5, times = 2, diagnosedDisease = "", diagnosisDetails = [] } = body;

  const diseaseContext = diagnosedDisease
    ? `\n- Diagnosed Disease: ${diagnosedDisease}${diagnosisDetails?.length ? ` (Top candidates: ${diagnosisDetails.map(d => `${d.name}${d.confidence ? ` ${d.confidence}%` : ""}`).join(", ")})` : ""}`
    : "";

  const prompt = `
You are a dermatologist assistant. Generate a safe, practical skincare routine tailored to the user's profile and the diagnosed skin condition. Avoid prescription-only medications. Prefer gentle, over-the-counter steps and general care advice. If the condition suggests seeing a dermatologist urgently, include that note in the motivational note.
Return only JSON.

Profile:
- Skin Type: ${skinType}
- Sensitivity Score: ${score}
- Climate: ${climate}
- Skin Concerns: ${skinConcerns.join(", ") || "none"}
- Routine Length: ${steps} steps
- Times per day: ${times}
${diseaseContext}

Output JSON Format ONLY (no text, no markdown):
{
  "morningRoutine": ["step1", "step2", ...],
  "eveningRoutine": ["step1", "step2", ...],
  "motivationalNote": "Short, supportive note (<= 180 chars)"
}
`;

  try {
    if (process.env.GEMINI_API_KEY) {
      const result = await model.generateContent(prompt);
      let rawText = result.response.text();

      // Strip markdown code fences if they exist
      rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();

      const jsonResponse = JSON.parse(rawText);
      return new Response(JSON.stringify(jsonResponse), { status: 200 });
    }
    throw new Error("GEMINI_API_KEY not set; using fallback");
  } catch (err: any) {
    console.warn("Skincare routine AI path failed; falling back to rules:", err?.message || err);

    // Fallback: rule-based routine generator (no external API)
    const safe = (arr: string[]) => arr.filter(Boolean);
    const isSensitive = Number(score) >= 70 || String(skinType).toLowerCase() === 'sensitive';
    const diseaseRaw = String(diagnosedDisease || '').toLowerCase();

    const categorize = (name: string) => {
      const pairs: Array<{ key: string; re: RegExp }> = [
        { key: 'psoriasis', re: /(psoriasis)/i },
        { key: 'acne', re: /(acne|comedone|blackhead|whitehead|pustule|papule)/i },
        { key: 'eczema', re: /(eczema|dermatitis|atopic|contact)/i },
        { key: 'seborrheic', re: /(seborrheic|dandruff)/i },
        { key: 'rosacea', re: /(rosacea)/i },
        { key: 'hyperpigmentation', re: /(melasma|hyperpig|dark\s*spot|pi[h|e]|post[-\s]*inflammatory)/i },
        { key: 'fungal', re: /(tinea|ringworm|pityriasis\s*versicolor|fungal)/i },
        { key: 'bacterial', re: /(impetigo|cellulitis|folliculitis|boil|furuncle)/i },
        { key: 'viral', re: /(wart|molluscum|herpes|zoster|varicella)/i },
        { key: 'vitiligo', re: /(vitiligo|leukoderma)/i },
      ];
      for (const p of pairs) if (p.re.test(name)) return p.key;
      return 'general';
    };

    const disease = categorize(diseaseRaw);

    const isDryClimate = /dry/i.test(String(climate));
    const moisturizer = isDryClimate ? "Thicker moisturizer (ceramides/occlusives)" : "Lightweight gel-cream moisturizer";

    let morning: string[] = [];
    let evening: string[] = [];
    let note = "Created with a rule-based generator due to AI unavailability.";

    const baseMorning = [
      "Gentle, fragrance-free cleanser",
      moisturizer,
      "Broad-spectrum sunscreen SPF 50+"
    ];
    const baseEvening = [
      "Gentle cleanser",
      "Moisturizer (ceramide or hyaluronic acid)"
    ];

    switch (disease) {
      case 'psoriasis': {
        morning = [
          "Gentle cleanser (lukewarm water)",
          "Thick, fragrance-free moisturizer on damp skin",
          "Sunscreen SPF 50+ (mineral if sensitive)"
        ];
        evening = [
          "Gentle cleanser",
          "Moisturizer; lock with petrolatum on plaques",
          "Avoid harsh exfoliants; short, cool showers"
        ];
        note = "For flare-ups, see a dermatologist. OTC 1% hydrocortisone may help short-term on small areas.";
        break;
      }
      case 'acne': {
        morning = [
          "Gentle cleanser",
          isSensitive ? "Niacinamide serum (2–5%)" : "Salicylic acid (0.5–2%) or Niacinamide",
          "Oil-free, non-comedogenic moisturizer",
          "Sunscreen SPF 50+"
        ];
        evening = [
          "Gentle cleanser",
          isSensitive ? "Azelaic acid 10% (2–3x/week)" : "Adapalene 0.1% (start 2–3x/week)",
          "Moisturizer"
        ];
        note = "Introduce actives slowly; stop if irritation. Persistent cystic acne needs a dermatologist.";
        break;
      }
      case 'eczema': {
        morning = [
          "Very gentle, soap-free cleanser",
          "Thick moisturizer (ceramides, shea) within 3 min of washing",
          "Mineral sunscreen SPF 50+"
        ];
        evening = [
          "Gentle cleanser or rinse only",
          "Moisturizer; seal with petrolatum on dry patches"
        ];
        note = "Avoid hot water/fragrance/wool. Severe itching or oozing warrants medical care.";
        break;
      }
      case 'rosacea': {
        morning = [
          "Ultra-gentle cleanser",
          "Anti-redness moisturizer (niacinamide/allantoin)",
          "Mineral sunscreen SPF 50+"
        ];
        evening = [
          "Gentle cleanser",
          isSensitive ? "Moisturizer only" : "Azelaic acid 10% (alternate nights)",
          "Moisturizer"
        ];
        note = "Avoid triggers (heat, spicy food, alcohol). Persistent flushing or eye symptoms: see a dermatologist.";
        break;
      }
      case 'hyperpigmentation': {
        morning = [
          "Gentle cleanser",
          "Vitamin C (if tolerated)",
          "Moisturizer",
          "Broad-spectrum sunscreen SPF 50+ + reapply"
        ];
        evening = [
          "Gentle cleanser",
          isSensitive ? "Niacinamide 5%" : "Azelaic acid 10% or Niacinamide 5%",
          "Moisturizer"
        ];
        note = "Daily SPF and reapplication are critical. Results take weeks; avoid harsh bleaching agents without supervision.";
        break;
      }
      case 'seborrheic': {
        morning = [
          "Gentle scalp/face wash",
          "Ketoconazole 1% shampoo on scalp/affected areas (2–3x/week)",
          "Light moisturizer",
          "Mineral sunscreen SPF 50+ (face)"
        ];
        evening = [
          "Gentle cleanser",
          "Moisturizer; avoid heavy oils on scalp/face"
        ];
        note = "Use antifungal shampoo consistently; reduce frequency after control. See a dermatologist if severe scaling persists.";
        break;
      }
      case 'fungal': {
        morning = [
          "Gentle cleanser",
          "Clotrimazole 1% cream thin layer on affected skin (2x/day)",
          moisturizer,
          "Sunscreen SPF 50+ if exposed"
        ];
        evening = [
          "Cleanser",
          "Clotrimazole 1% cream again",
          "Moisturizer"
        ];
        note = "Keep area dry, avoid sharing towels. If not better in 2 weeks or extensive, see a dermatologist.";
        break;
      }
      case 'bacterial': {
        morning = [
          "Gentle cleanser",
          "Benzoyl peroxide 2.5% wash for folliculitis or antibacterial wash (short contact)",
          moisturizer,
          "Sunscreen SPF 50+"
        ];
        evening = [
          "Cleanser",
          "Moisturizer; avoid picking or shaving over lesions"
        ];
        note = "Spreading redness, pain, fever, or drainage needs urgent medical care.";
        break;
      }
      case 'viral': {
        morning = [
          "Gentle cleanser",
          "Targeted salicylic acid wart treatment (apply only on wart)",
          moisturizer,
          "Sunscreen SPF 50+"
        ];
        evening = [
          "Cleanser",
          "Moisturizer"
        ];
        note = "Avoid sharing razors/towels. Facial or genital lesions require doctor review.";
        break;
      }
      case 'vitiligo': {
        morning = [
          "Gentle cleanser",
          moisturizer,
          "Strict broad-spectrum sunscreen SPF 50+ on all exposed areas"
        ];
        evening = [
          "Gentle cleanser",
          "Moisturizer"
        ];
        note = "Protect from sun; avoid skin trauma. Early dermatology input improves options.";
        break;
      }
      case 'general':
      default: {
        morning = baseMorning;
        evening = baseEvening;
        note = "General gentle routine applied; customize based on tolerance.";
      }
    }

    // Respect requested steps count by trimming
    if (steps && steps > 0) {
      morning = morning.slice(0, Math.max(1, Math.min(morning.length, steps)));
      evening = evening.slice(0, Math.max(1, Math.min(evening.length, steps)));
    }

    return new Response(
      JSON.stringify({
        morningRoutine: safe(morning),
        eveningRoutine: safe(evening),
        motivationalNote: note
      }),
      { status: 200 }
    );
  }
}
