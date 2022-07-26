const formatter = new Intl.DateTimeFormat('default', { year: 'numeric', month: 'long', day: 'numeric' })

const DateFormatter = ({ dateString }: { dateString: string | Date }) => {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  return <time dateTime={date.toISOString()}>{formatter.format(date)}</time>
}

export default DateFormatter