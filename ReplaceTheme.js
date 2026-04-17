const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/website-master/website-master/src/pages/LandingPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
    'from-indigo-900/90 via-slate-950/60 to-amber-600/20': 'from-green-950/90 via-green-900/60 to-emerald-800/40',
    'bg-slate-950': 'bg-green-950',
    'bg-slate-950/35': 'bg-green-900/40',
    'text-indigo-900': 'text-green-950',
    'hover:bg-indigo-50': 'hover:bg-green-50',
    'from-indigo-700 via-purple-700 to-amber-500': 'from-green-800 to-emerald-600',
    'from-indigo-50 via-violet-50 to-amber-50': 'from-emerald-50 via-green-50 to-teal-50',
    'border-indigo-100': 'border-emerald-100',
    'ring-blue-200': 'ring-emerald-200',
    'from-indigo-700 to-amber-500': 'from-green-800 to-emerald-600',
    'bg-blue-50': 'bg-emerald-50',
    'bg-purple-50': 'bg-teal-50',
    'text-blue-800': 'text-emerald-800',
    'text-purple-800': 'text-teal-800',
    'from-teal-50 via-cyan-50 to-emerald-50': 'from-green-50 via-emerald-50 to-teal-50',
    'from-teal-600 to-emerald-600': 'from-green-800 to-emerald-600',
    'from-teal-600 via-cyan-600 to-emerald-600': 'from-green-800 via-emerald-700 to-teal-600',
    'from-teal-50 to-cyan-50': 'from-green-50 to-emerald-50',
    'hover:from-teal-100 hover:to-cyan-100': 'hover:from-green-100 hover:to-emerald-100',
    'hover:from-cyan-50 hover:to-emerald-50': 'hover:from-emerald-50 hover:to-teal-50',
    'from-cyan-50 to-emerald-50': 'from-emerald-50 to-teal-50',
    'from-teal-400 via-cyan-400 to-emerald-400': 'from-green-600 via-emerald-500 to-teal-600',
    'text-indigo-600': 'text-green-800',
    'border-indigo-800': 'border-green-800',
    'border-purple-100': 'border-green-100',
    'border-purple-200': 'border-green-200',
    'ring-purple-500': 'ring-green-500',
    'border-purple-500': 'border-green-500',
    'bg-gradient-to-r from-blue-600 to-cyan-600': 'bg-gradient-to-r from-green-600 to-emerald-600',
    'bg-gradient-to-r from-cyan-600 to-emerald-600': 'bg-gradient-to-r from-emerald-600 to-teal-600',
    'border-blue-200': 'border-emerald-200',
    'border-cyan-200': 'border-teal-200',
    'from-blue-50 to-cyan-50': 'from-emerald-50 to-green-50',
    'from-cyan-50 to-emerald-50': 'from-green-50 to-teal-50',
    'from-blue-50 to-emerald-50': 'from-emerald-50 to-teal-50'
};

for (const [key, value] of Object.entries(replacements)) {
    content = content.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated LandingPage.tsx colors.');
