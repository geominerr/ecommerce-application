enum Styles {
  ERROR_HINT = 'error-hint',
  VISIBLE = 'visible',
  VISIBLE_PASS_STRONG = 'visible--strong-pass',
  VISIBLE_PASS_MEDIUM = 'visible--medium-pass',
  VISIBLE_PASS_WEAK = 'visible--weak-pass',
  VISIBLE_WARNING = 'visible--attention',
}

enum TagNames {
  DIV = 'DIV',
}

enum StrengthPassword {
  WEAK = 'Weak password.',
  MEDIUM = 'Medium password strength.',
  STRONG = 'Strong password.',
}

export { TagNames, Styles, StrengthPassword };
