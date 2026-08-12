import {defineArrayMember, defineField, defineType} from 'sanity'

export const photoSet = defineType({
  name: 'photoSet',
  title: 'Photo set',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'date', type: 'date', validation: (r) => r.required()}),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'caption', type: 'string'}),
            defineField({name: 'camera', type: 'string'}),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {name: 'dateDesc', title: 'Date, newest first', by: [{field: 'date', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'images.0'},
  },
})
