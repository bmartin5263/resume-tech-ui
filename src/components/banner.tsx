import styles from "styles/banner.module.scss";

export type BannerProps = {
  className: string, 
  children: string, 
  omnipresent: boolean,
  bannerType: BannerType,
}

// Season enums can be grouped as static members of a class
export class BannerType {
  css: string;


  // Create new instances of the same class as static attributes
  static INFO = new BannerType(styles.info)
  static SUCCESS = new BannerType(styles.success)
  static WARN = new BannerType(styles.warn)
  static ERROR = new BannerType(styles.error)

  constructor(css: string) {
    this.css = css
  }
}

function Banner({className, children, bannerType, omnipresent}: BannerProps) {
  if (bannerType == null) {
    throw new Error("bannerType cannot be null");
  }

  var classes = [styles.banner];
  var empty = children == null || (typeof children === 'string' && children.length == 0);

  if (empty) {
    if (!omnipresent) {
      classes.push(styles.hidden)
    }
  }
  else {
    classes.push(bannerType.css)
  }
  if (className != null) {
    classes.push(className);
  }

  return (
    <>
      <div className={classes.join(' ')}>
        {children}
      </div>
    </>
  )
}

export default Banner