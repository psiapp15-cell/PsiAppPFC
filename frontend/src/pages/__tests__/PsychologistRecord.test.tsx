import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test/renderWithProviders';
import { PsychologistRecord } from '../PsychologistRecord';

describe('Tela de prontuário (bloqueada)', () => {
  it('mostra aviso de area restrita', () => {
    renderWithProviders(<PsychologistRecord />, { route: '/psychologist/record' });
    expect(screen.getByText(/área restrita/i)).toBeInTheDocument();
    expect(screen.getAllByText(/bloqueado/i).length).toBeGreaterThan(0);
  });

  it('cita requisitos de seguranca antes de liberar prontuario', () => {
    renderWithProviders(<PsychologistRecord />, { route: '/psychologist/record' });
    expect(screen.getByText(/validação de token/i)).toBeInTheDocument();
    expect(screen.getByText(/perfil do usuário/i)).toBeInTheDocument();
    expect(screen.getByText(/clínica ou organização/i)).toBeInTheDocument();
    expect(screen.getByText(/vínculo terapêutico/i)).toBeInTheDocument();
    expect(screen.getByText(/auditoria/i)).toBeInTheDocument();
  });

  it('nao exibe conteudo clinico', () => {
    renderWithProviders(<PsychologistRecord />, { route: '/psychologist/record' });
    expect(screen.getByText(/conteúdo clínico protegido/i)).toBeInTheDocument();
  });
});
