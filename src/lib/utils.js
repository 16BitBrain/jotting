export const formatDate = (date) => {
  try {
    // need this otherwise it will always showing 10 january 1972, idk why
    const dateObject = date.toDate()

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObject)
  } catch (error) {
    // but some data may not be affected when it first created
    // weird, ik
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }
}
