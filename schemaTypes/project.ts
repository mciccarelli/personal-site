import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', type: 'string'}),
    defineField({name: 'url', type: 'url'}),
    defineField({name: 'description', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'technologies', type: 'string'}),
    defineField({name: 'image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'video', type: 'file', options: {accept: 'video/mp4'}}),
    defineField({name: 'date', type: 'date', validation: (r) => r.required()}),
  ],
  orderings: [
    {name: 'dateDesc', title: 'Date, newest first', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'image'},
  },
})
