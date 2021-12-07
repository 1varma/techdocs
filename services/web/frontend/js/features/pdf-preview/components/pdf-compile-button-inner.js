import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Icon from '../../../shared/components/icon'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useLayoutContext } from '../../../shared/context/layout-context'

const modifierKey = /Mac/i.test(navigator.platform) ? 'Cmd' : 'Ctrl'

function PdfCompileButtonInner({ startCompile, compiling }) {
  const { detachRole } = useLayoutContext()

  const { t } = useTranslation()

  const compileButtonLabel = compiling ? t('compiling') + '…' : t('recompile')

  return (
    <OverlayTrigger
      placement="bottom"
      delayShow={500}
      overlay={
        <Tooltip id="tooltip-logs-toggle" className="keyboard-tooltip">
          {t('recompile_pdf')}{' '}
          {detachRole !== 'detached' && (
            <span className="keyboard-shortcut">({modifierKey} + Enter)</span>
          )}
        </Tooltip>
      }
    >
      <Button
        className="btn-recompile"
        bsStyle="success"
        onClick={() => startCompile()}
        aria-label={compileButtonLabel}
      >
        <Icon type="refresh" spin={compiling} />
        <span className="toolbar-hide-medium toolbar-hide-small btn-recompile-label">
          {compileButtonLabel}
        </span>
      </Button>
    </OverlayTrigger>
  )
}

PdfCompileButtonInner.propTypes = {
  compiling: PropTypes.bool.isRequired,
  startCompile: PropTypes.func.isRequired,
}

export default memo(PdfCompileButtonInner)