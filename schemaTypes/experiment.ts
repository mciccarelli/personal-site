import {defineField, defineType} from 'sanity'

// a workbench entry: a prototype, study, or tool. same shape as a project minus the role,
// so the column can render it with the same card
export const experiment = defineType({
  name: 'experiment',
  title: 'Experiment',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'date', type: 'date', validation: (r) => r.required()}),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'One short line: what it is, or what it is testing.',
    }),
    defineField({name: 'technologies', type: 'string', description: 'Stack, comma separated.'}),
    defineField({name: 'url', type: 'url', description: 'Demo, repo, or write-up.'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'video', type: 'file', options: {accept: 'video/mp4'}}),
  ],
  orderings: [
    {name: 'dateDesc', title: 'Date, newest first', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'image'},
  },
})
