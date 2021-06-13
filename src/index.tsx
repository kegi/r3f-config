import styles from './styles.module.css'
interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return (
    <div className={styles.test}>
      Cool component : { text }
    </div>
  )
}
