import { styled } from '@nextui-org/react';

export const Status = styled('span', {
  display: 'inline-block',
    textTransform: 'uppercase',
    padding: '8px 12px',
    margin: '0 2px',
    fontSize: '12px',
    fontWeight: '$bold',
    borderRadius: '14px',
    letterSpacing: '0.6px',
    lineHeight: 1,
    boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 15%)',
    alignItems: 'center',
    alignSelf: 'center',
    color: '$white',
    variants: {
      type: {
        active: {
          bg: '$primary',
          color: '$white'
        },
        archived: {
          bg: '$statusArchived',
          color: '$statusArchivedContrast'
        },
        completed: {
          bg: '$statusCompleted',
          color: '$white'
        },
        phase: {
          bg: '$white',
          color: '$primary',
          borderColor: '$primary'
        },
      }
    },
    defaultVariants: {
      type: 'active'
    }
  });
