/**
 * The career assessment.
 *
 * dregeup.com advertises an "8-minute" data-driven assessment but does not
 * publish its instrument, so this is OUR questionnaire, not a reproduction of
 * theirs. It is an interest-and-aptitude sorter, deliberately presented as
 * "a starting point for a conversation" rather than as a diagnostic — the
 * result screen says so, and every result routes to a human counsellor.
 *
 * Scoring: each option adds weight to one or more stream slugs from
 * catalogue.js. The top three streams are shown, with the gap between them
 * used to phrase how strong the signal is.
 */

export const questions = [
  {
    id: 'subject',
    prompt: 'Which subject do you actually enjoy, not just score well in?',
    options: [
      { label: 'Mathematics & Physics', weights: { engineering: 3, science: 2 } },
      { label: 'Biology & Chemistry', weights: { medical: 3, pharmacy: 2, science: 1 } },
      { label: 'Business Studies & Economics', weights: { commerce: 3, management: 2 } },
      { label: 'Literature, History & Politics', weights: { arts: 3, law: 2 } },
    ],
  },
  {
    id: 'work',
    prompt: 'Pick the working day that sounds least like a chore.',
    options: [
      { label: 'Breaking a hard problem down until it gives', weights: { engineering: 3, science: 2 } },
      { label: 'Talking to people and moving a decision forward', weights: { management: 3, law: 1 } },
      { label: 'Caring for someone and seeing them improve', weights: { medical: 3, pharmacy: 1 } },
      { label: 'Making something that did not exist this morning', weights: { design: 3, arts: 2 } },
    ],
  },
  {
    id: 'strength',
    prompt: 'What do people come to you for?',
    options: [
      { label: 'Figuring out why something broke', weights: { engineering: 3, science: 1 } },
      { label: 'Organising the chaos', weights: { management: 3, commerce: 2 } },
      { label: 'An argument that actually holds up', weights: { law: 3, arts: 1 } },
      { label: 'A second opinion on how it looks', weights: { design: 3, arts: 1 } },
    ],
  },
  {
    id: 'numbers',
    prompt: 'A spreadsheet of numbers lands in front of you.',
    options: [
      { label: 'Good. I want to know what it says', weights: { commerce: 3, management: 2, science: 1 } },
      { label: 'Fine, if there is a formula to derive', weights: { engineering: 3, science: 2 } },
      { label: 'I would rather read the report about it', weights: { arts: 2, law: 2 } },
      { label: 'Only if it tells me something about a person', weights: { medical: 2, management: 1 } },
    ],
  },
  {
    id: 'horizon',
    prompt: 'How long are you willing to study before you start earning?',
    options: [
      { label: 'Three years, then I want to be working', weights: { commerce: 2, arts: 2, design: 2 } },
      { label: 'Four years is fine for the right field', weights: { engineering: 3, pharmacy: 2 } },
      { label: 'Five or more — I am playing the long game', weights: { medical: 3, law: 2 } },
      { label: 'I will study again later, after some work', weights: { management: 3, commerce: 1 } },
    ],
  },
  {
    id: 'setting',
    prompt: 'Where would you rather spend most of your week?',
    options: [
      { label: 'A lab or a workshop', weights: { science: 3, engineering: 2, pharmacy: 1 } },
      { label: 'A hospital or a clinic', weights: { medical: 3 } },
      { label: 'An office where things get decided', weights: { management: 3, commerce: 2, law: 1 } },
      { label: 'A studio, a newsroom or a courtroom', weights: { design: 2, arts: 2, law: 2 } },
    ],
  },
  {
    id: 'risk',
    prompt: 'Which sentence is more true of you?',
    options: [
      { label: 'I want a clear, established path', weights: { medical: 2, engineering: 2, commerce: 2 } },
      { label: 'I would rather build my own', weights: { management: 3, design: 2 } },
      { label: 'I want to be the expert others call', weights: { science: 2, law: 2, medical: 1 } },
      { label: 'I have not decided, and that is why I am here', weights: {} },
    ],
  },
  {
    id: 'stage',
    prompt: 'Where are you right now?',
    meta: 'stage',
    options: [
      { label: 'In Class 11 or 12', value: 'school', weights: {} },
      { label: 'Taking a gap year', value: 'gap', weights: {} },
      { label: 'In the final year of a degree', value: 'final', weights: {} },
      { label: 'Graduated, and working', value: 'working', weights: {} },
    ],
  },
]

/** Copy shown per stream on the result screen. */
export const streamNotes = {
  management: 'You sort problems by people and priorities. BBA now, or an MBA after a couple of years working.',
  engineering: 'You want to know the mechanism. B.Tech, then specialise — or M.Tech if research pulls at you.',
  medical: 'The long path, and you already know it. MBBS via NEET, or the allied-health routes worth a real look.',
  commerce: 'Numbers are a language you already read. B.Com, BBA, or a professional track alongside the degree.',
  science: 'You like the question more than the answer. B.Sc into research, or the data and computing routes.',
  arts: 'You think in arguments and context. A humanities degree opens law, policy, media and civil services.',
  design: 'You judge things by how they work and how they look. B.Des or B.Arch, portfolio-led from here.',
  law: 'You want the argument to hold. A five-year integrated LLB straight after Class 12 is the efficient route.',
  pharmacy: 'Chemistry with a clear industry on the other side. B.Pharma into formulation, research or regulation.',
}

export function scoreAnswers(answers) {
  const totals = {}
  questions.forEach((q) => {
    const chosen = answers[q.id]
    if (chosen == null) return
    const opt = q.options[chosen]
    if (!opt) return
    Object.entries(opt.weights).forEach(([k, v]) => {
      totals[k] = (totals[k] ?? 0) + v
    })
  })

  const ranked = Object.entries(totals)
    .map(([slug, score]) => ({ slug, score }))
    .sort((a, b) => b.score - a.score)

  const top = ranked[0]?.score ?? 0
  const second = ranked[1]?.score ?? 0
  // A clear winner means a decisive gap; otherwise say the signal is mixed.
  const confidence = top === 0 ? 'none' : top - second >= 4 ? 'clear' : 'mixed'

  return { ranked: ranked.slice(0, 3), confidence }
}
